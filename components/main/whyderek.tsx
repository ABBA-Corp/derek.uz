import Image from "next/image";
import { useInView } from "react-intersection-observer";
import styles from "../../styles/home.module.css";
import { MotionSection } from "./motion-section";
import mainImage from "../../public/media/fade_img.png";
import { kachok, mikrob, qalqon, tish } from "../../public/icons";
import { useContext } from "react";
import { TranslationsContext } from "../../context/translations";

export function MainWhyDerek() {
  const { ref: section, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
  });
  const { t } = useContext(TranslationsContext);
  const gridCards = [
    {
      id: 1,
      title: t["main.smile_h_1"],
      desc: t["main.smile_mini_desc1"],
      icon: kachok,
    },
    {
      id: 2,
      title: t["main.smile_h_2"],
      desc: t["main.smile_mini_desc2"],
      icon: tish,
    },
    {
      id: 3,
      title: t["main.smile_h_3"],
      desc: t["main.smile_mini_desc3"],
      icon: mikrob,
    },
    {
      id: 4,
      title: t["main.smile_h_4"],
      desc: t["main.smile_mini_desc4"],
      icon: qalqon,
    },
    {
      id: 5,
      title: t["main.smile_h_5"],
      desc: t["main.smile_mini_desc5"],
      icon: qalqon,
    },
    {
      id: 6,
      title: t["main.smile_h_6"],
      desc: t["main.smile_mini_desc6"],
      icon: mikrob,
    },
  ];

  return (
    <MotionSection
      motionRef={section}
      motionBoolean={sectionIsVisible}
      customClass={`${styles.section} miniBox`}
    >
      <div className={`box ${styles.whyderek_inner}`}>
        <div className={styles.content_side}>
          <div className={styles.content_titles}>
            <p>
              <b>{t["main.whyderek"]}?</b> #WeloveyourSMILE
            </p>
            <p>{t["main.smile_mini_desc"]}</p>
          </div>
          <div className={styles.content_grid}>
            {gridCards.map((card) => {
              return (
                <div key={card.id} className={styles.content_grid_card}>
                  <span className={styles.content_grid_card_icon}>
                    {card.icon}
                  </span>
                  <div className={styles.content_grid_card_info}>
                    <p className={styles.content_grid_card_title}>
                      {card.title}
                    </p>
                    <p className={styles.content_grid_card_desc}>{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.image_side}>
          <Image src={mainImage} alt={"main image"} loading={"lazy"} />
        </div>
      </div>
    </MotionSection>
  );
}
