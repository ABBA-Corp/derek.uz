import { useInView } from "react-intersection-observer";
import { MotionSection } from "./motion-section";
import styles from "../../styles/home.module.css";
import catimg from "../../public/media/banner_cat.png";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { SiteInfoContext } from "../../context/siteinfo";
import { TranslationsContext } from "../../context/translations";

export function MainCategoryBanner() {
  const { siteInfo } = useContext(SiteInfoContext);

  const { ref: section, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
  });
  const { t } = useContext(TranslationsContext);
  return (
    <MotionSection motionRef={section} motionBoolean={sectionIsVisible}>
      <div className="box">
        <div className={`withGray ${styles.category_banner_inner}`}>
          <div className={styles.category_banner_content}>
            <div className={styles.category_banner_titles}>
              <p className={styles.category_banner_title}>
                {t["main.derek_categories"]}
              </p>
              <p className={styles.category_banner_desc}>
                {t["main.category_desc_middle"]}
              </p>
            </div>
            <div className={styles.category_banner_buttons}>
              <Link href={"/category"}>{t["main.gotocatalog"]}</Link>
              <a
                href={siteInfo.cotalog}
                aria-label="download catalogue"
                target={"_blank"}
                rel={"noreferrer"}
              >
                {t["main.download"]}
              </a>
            </div>
          </div>
          <div className={styles.new_div}>
            <Image src={catimg} alt={"categories image"} loading={"lazy"} />
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
