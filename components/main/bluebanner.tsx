import Image from "next/image";
import { useInView } from "react-intersection-observer";
import styles from "../../styles/home.module.css";
import { MotionSection } from "./motion-section";
import logoMini from "../../public/media/footer_derek.png";
import {
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

export function MainBlueBanner() {
  const { siteInfo } = useContext(SiteInfoContext);
  const { setIsModal, setModalCase } = useContext(ModalContext);

  const { ref: section, inView: sectionIsVisible } = useInView({
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

  return (
    <MotionSection motionRef={section} motionBoolean={sectionIsVisible}>
      <div className={`box`}>
        <div className={styles.bluebanner_inner}>
          <div className={styles.bluebanner_first}>
            <span className={styles.onDesktop}>{logo}</span>
            <Image src={logoMini} alt={"logo"} className={styles.onMobile} />
            <p>Kompaniyamiz haqida</p>
          </div>
          <div className={styles.bluebanner_second}>
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
                Biz bilan aloqa
              </button>
              <button onClick={gobottom}>Bizning manzil</button>
            </nav>
          </div>
          <div className={styles.bluebanner_last}>
            <p className={styles.bluebanner_last_desc}>Free conculting</p>
            <div className={styles.bluebanner_last_content}>
              <p className={styles.bluebanner_last_desc}>
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry&apos;s standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It
                wsimply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry&apos;s standard{" "}
              </p>
              <div className={styles.bluebanner_last_content_bottom}>
                <p>Smile makeover</p>
                <p>We believe in the power of your smile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
