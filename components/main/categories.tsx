import Link from "next/link";
import styles from "../../styles/home.module.css";
import Image from "next/image";
import { swiperArrow, tish } from "../../public/icons";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { MotionSection } from "./motion-section";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SiteInfoContext } from "../../context/siteinfo";
import { TranslationsContext } from "../../context/translations";
import notish from "../../public/media/img2.png";

export function MainCategories() {
  const { locale } = useRouter();
  const [categories, setCategories] = useState<any>([]);
  const { siteInfo } = useContext(SiteInfoContext);

  const { ref: section, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
  });

  async function getCategories() {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_ENDPOINT + "/categories",
      { headers: { language: locale } }
    );
    const categories = await res.data;
    return categories;
  }

  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res.results);
      })
      .catch((e) => console.log(e));
  }, []);

  const { t } = useContext(TranslationsContext);

  return (
    <MotionSection motionRef={section} motionBoolean={sectionIsVisible}>
      <div className="box">
        <h3 className="section_title">{t["main.categories_h"]}</h3>
        <div className={`withGray ${styles.categories_grid}`}>
          <div className={styles.categories_intro}>
            <p>{t["main.categories_desc1"]}</p>
            <div className={styles.categories_intro__links}>
              <a
                href={siteInfo.cotalog}
                aria-label="download"
                className={styles.download_link}
                target={"_blank"}
                rel="noreferrer"
              >
                {t["main.categories_download"]}
              </a>
              <Link href={"/category"} className={styles.category_link}>
                {t["main.allcategoriesbtn"]}
              </Link>
            </div>
          </div>
          {categories.map((category: any, i: number) => {
            return <CategoryCard key={i} category={category} />;
          })}
          <Link
            href={`/category`}
            className={`${styles.category} ${styles.last}`}
          >
            <p className={styles.category_title}>{t["main.all_categories"]}</p>
            {swiperArrow}
          </Link>
        </div>
      </div>
    </MotionSection>
  );
}

type Props = {
  category: any;
  i?: number;
  cardRef?: any;
  cardIsVisible?: boolean;
};

export const CategoryCard = ({
  category,
  i,
  cardRef,
  cardIsVisible,
}: Props) => {
  const { pathname } = useRouter();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth <= 580) {
      setIsMobile(true);
    }
  }, []);

  if (isMobile || pathname === "/") {
    return (
      <Link href={`/category/${category.id}`} className={styles.category}>
        <Image
          src={category.icon ? category.icon : notish}
          alt={category.name}
          width={43}
          height={48}
        />
        <p className={styles.category_title}>{category.name}</p>
      </Link>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={cardIsVisible ? "animation" : ""}
      variants={{
        hidden: { x: -20, opacity: 0 },
        animation: {
          x: 0,
          opacity: 1,
          transition: { duration: 0.3, delay: i ? i * 0.2 : 0.2 },
        },
      }}
    >
      <Link href={`/category/${category.id}`} className={styles.category}>
        <Image
          src={category.icon ? category.icon : notish}
          alt={category.name}
          width={43}
          height={48}
        />
        <p className={styles.category_title}>{category.name}</p>
      </Link>
    </motion.div>
  );
};

export const SearchCategoryCard = ({ category }: { category: any }) => {
  return (
    <Link href={`/category/${category.id}`} className={styles.category}>
      <Image
        src={category.icon ? category.icon : notish}
        alt={category.name}
        width={43}
        height={48}
      />
      <p className={styles.category_title}>{category.name}</p>
    </Link>
  );
};
