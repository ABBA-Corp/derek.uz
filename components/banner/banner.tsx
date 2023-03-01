import styles from "./banner.module.css";
import tg from "../../public/media/big_tg.png";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { MotionSection } from "../main/motion-section";
import { useContext } from "react";
import { SiteInfoContext } from "../../context/siteinfo";
import { TranslationsContext } from "../../context/translations";

export function TelegramBanner() {
  const { siteInfo } = useContext(SiteInfoContext);

  const { ref: section, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
  });
  const { t } = useContext(TranslationsContext);

  return (
    <MotionSection
      motionRef={section}
      motionBoolean={sectionIsVisible}
      customClass={styles.banner_section}
    >
      <Image src={tg} alt={"telegram icon"} className={styles.img1} />
      <Image src={tg} alt={"telegram icon"} className={styles.img2} />
      <div className="miniBox">
        <div className={styles.banner_inner}>
          <p className={styles.banner_desc}>{t["main.telegram_banner_desc"]}</p>
          <a
            href={siteInfo.telegram}
            className={styles.subscribe}
            aria-label={"subscribe to the telegram"}
            target={"_blank"}
            rel={"noreferrer"}
          >
            {t["main.telegram_banner_sub"]}
          </a>
        </div>
      </div>
    </MotionSection>
  );
}
