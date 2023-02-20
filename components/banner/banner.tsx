import styles from "./banner.module.css";
import tg from "../../public/media/big_tg.png";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { MotionSection } from "../main/motion-section";
import { useContext } from "react";
import { SiteInfoContext } from "../../context/siteinfo";

export function TelegramBanner() {
  const { siteInfo } = useContext(SiteInfoContext);

  const { ref: section, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
  });

  return (
    <MotionSection
      motionRef={section}
      motionBoolean={sectionIsVisible}
      customClass={styles.banner_section}
    >
      <Image src={tg} alt={"telegram icon"} />
      <div className="miniBox">
        <div className={styles.banner_inner}>
          <p className={styles.banner_desc}>
            Подписывайтесь на наш Telegram-канал и первыми получайте информацию
            о ближайших курсах, открытых лекциях и выгодных предложениях.
          </p>
          <a
            href={siteInfo.telegram}
            className={styles.subscribe}
            aria-label={"subscribe to the telegram"}
            target={"_blank"}
            rel={"noreferrer"}
          >
            Подписаться
          </a>
        </div>
      </div>
    </MotionSection>
  );
}
