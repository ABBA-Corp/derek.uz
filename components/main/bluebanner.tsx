import Image from "next/image";
import { useInView } from "react-intersection-observer";
import styles from "../../styles/home.module.css";
import { MotionSection } from "./motion-section";
import logoMini from "../../public/media/footer_derek.png";
import {
  exclude,
  facebook,
  instagram,
  logo,
  telegram,
  youtube,
} from "../../public/icons";
import { useContext } from "react";
import { SiteInfoContext } from "../../context/siteinfo";
import { ModalContext } from "../../context/modal";
import { gobottom } from "../../pages/_app";
import { motion } from "framer-motion";
import { TranslationsContext } from "../../context/translations";

export function MainBlueBanner() {
  const { siteInfo } = useContext(SiteInfoContext);
  const { setIsModal, setModalCase } = useContext(ModalContext);

  const { ref: section, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
  });

  const { ref: div1, inView: div1IsVisible } = useInView({
    triggerOnce: true,
  });

  const { ref: div2, inView: div2IsVisible } = useInView({
    triggerOnce: true,
  });

  const { ref: div3, inView: div3IsVisible } = useInView({
    triggerOnce: true,
  });

  const socialMedia = [
    {
      id: 1,
      title: "youtube",
      icon: youtube,
      url: siteInfo.youtube,
    },
    {
      id: 2,
      title: "telegram",
      icon: telegram,
      url: siteInfo.telegram,
    },
    {
      id: 3,
      title: "instagram",
      icon: instagram,
      url: siteInfo.instagram,
    },
    {
      id: 4,
      title: "facebook",
      icon: facebook,
      url: siteInfo.facebook,
    },
  ];
  const { t } = useContext(TranslationsContext);
  return (
    <MotionSection motionRef={section} motionBoolean={sectionIsVisible}>
      <div className={`box`}>
        <div className={styles.bluebanner_inner}>
          <motion.div
            className={styles.bluebanner_first}
            ref={div1}
            initial="hidden"
            animate={div1IsVisible ? "animation" : ""}
            variants={{
              hidden: { y: 40, opacity: 0 },
              animation: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.5, delay: 0.4 },
              },
            }}
          >
            <span className={styles.exclude}>{exclude}</span>
            <span className={styles.exclude_end}>{exclude}</span>
            <span className={styles.onDesktop}>{logo}</span>
            <Image src={logoMini} alt={"logo"} className={styles.onMobile} />
            <p>{t["main.aboutour_company"]}</p>
          </motion.div>

          <motion.div
            className={styles.bluebanner_last}
            ref={div3}
            initial="hidden"
            animate={div3IsVisible ? "animation" : ""}
            variants={{
              hidden: { y: 40, opacity: 0 },
              animation: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.5, delay: 1.2 },
              },
            }}
          >
            <span className={styles.exclude}>{exclude}</span>
            <span className={styles.exclude_end}>{exclude}</span>
            {/* <p className={styles.bluebanner_last_desc}>{t["main.aboutfree"]}</p> */}
            <div className={styles.bluebanner_last_content}>
              <p className={styles.bluebanner_last_desc}>
                {t["main.blue_desc"]}
              </p>
              <div className={styles.bluebanner_last_content_bottom}>
                <p>{t["main.smile_makeover"]}</p>
                <p>{t["main.smile_bluedesc"]}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.bluebanner_second}
            ref={div2}
            initial="hidden"
            animate={div2IsVisible ? "animation" : ""}
            variants={{
              hidden: { y: 40, opacity: 0 },
              animation: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.5, delay: 0.8 },
              },
            }}
          >
            <span className={styles.exclude_tl}>{exclude}</span>
            <span className={styles.exclude_tr}>{exclude}</span>
            <span className={styles.exclude_bl}>{exclude}</span>
            <span className={styles.exclude_br}>{exclude}</span>
            <nav className={styles.bluebanner_nav}>
              {socialMedia.map((sm) => {
                return (
                  <a
                    key={sm.id}
                    href={sm.url}
                    className={styles.bluebanner_nav_link}
                    target={"_blank"}
                    rel={"noreferrer"}
                  >
                    {sm.icon}
                  </a>
                );
              })}
            </nav>
            <nav className={styles.bluebanner_nav}>
              <button
                onClick={() => {
                  setModalCase("post");
                  setIsModal(true);
                }}
              >
                {t["main.contactwithus"]}
              </button>
              <button onClick={gobottom}>{t["main.our_location"]}</button>
            </nav>
          </motion.div>
        </div>
      </div>
    </MotionSection>
  );
}
