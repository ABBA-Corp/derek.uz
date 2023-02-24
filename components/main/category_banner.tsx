import { useInView } from "react-intersection-observer";
import { MotionSection } from "./motion-section";
import styles from "../../styles/home.module.css";
import catimg from "../../public/media/banner_cat.png";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { SiteInfoContext } from "../../context/siteinfo";

export function MainCategoryBanner() {
  const { siteInfo } = useContext(SiteInfoContext);

  const { ref: section, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
  });

  return (
    <MotionSection motionRef={section} motionBoolean={sectionIsVisible}>
      <div className="box">
        <div className={`withGray ${styles.category_banner_inner}`}>
          <div className={styles.category_banner_content}>
            <div className={styles.category_banner_titles}>
              <p className={styles.category_banner_title}>Derek Category</p>
              <p className={styles.category_banner_desc}>
                Филиалы в 30 регионах России. Представительства включают не
                только маркетинговые подразделения, но и проектные и монтажные.
                Мы знаем регионы, понимаем их специфику. Эффективной работы в
                сфере энергетического строительства. Представительства включают
                не только маркетинговые подразделения, но и проектные и
                монтажные. Мы знаем регионы, понимаем их специфику.
              </p>
            </div>
            <div className={styles.category_banner_buttons}>
              <Link href={"/category"}>Katalogga kirish</Link>
              <a
                href={siteInfo.cotalog}
                aria-label="download catalogue"
                target={"_blank"}
                rel={"noreferrer"}
              >
                Yuklab olish
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
