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

  return (
    <MotionSection motionRef={section} motionBoolean={sectionIsVisible}>
      <div className="box">
        <h3 className="section_title">Mahsulotlar kategoriyasi</h3>
        <div className={`withGray ${styles.categories_grid}`}>
          <div className={styles.categories_intro}>
            <p>
              Derek mahsuloti <b>30 dan</b> ortiq mahsulotlar bor
            </p>
            <div className={styles.categories_intro__links}>
              <a
                href={siteInfo.cotalog}
                aria-label="download"
                className={styles.download_link}
              >
                Download catalog
              </a>
              <Link href={"/category"} className={styles.category_link}>
                Katalogga o’tish
              </Link>
            </div>
          </div>
          {categories.map((category: any, i: number) => {
            return (
              <CategoryCard key={i} id={category.id} title={category.name} />
            );
          })}
          <Link
            href={`/category`}
            className={`${styles.category} ${styles.last}`}
          >
            <p className={styles.category_title}>Barcha kategoriyalar</p>
            {swiperArrow}
          </Link>
        </div>
      </div>
    </MotionSection>
  );
}

type Props = {
  id: number;
  title: string | any;
  i?: number;
  cardRef?: any;
  cardIsVisible?: boolean;
};

export const CategoryCard = ({
  id,
  title,
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
      <Link href={`/category/${id}`} className={styles.category}>
        {tish}
        <p className={styles.category_title}>{title}</p>
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
      <Link href={`/category/${id}`} className={styles.category}>
        {tish}
        <p className={styles.category_title}>{title}</p>
      </Link>
    </motion.div>
  );
};

export const SearchCategoryCard = ({
  id,
  title,
}: {
  id: number;
  title: string;
}) => {
  return (
    <Link href={`/category/${id}`} className={styles.category}>
      {tish}
      <p className={styles.category_title}>{title}</p>
    </Link>
  );
};
