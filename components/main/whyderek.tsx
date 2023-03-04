import Image from "next/image";
import { useInView } from "react-intersection-observer";
import styles from "../../styles/home.module.css";
import { MotionSection } from "./motion-section";
import mainImage from "../../public/media/fade_img.png";
import { kachok, mikrob, qalqon, tish } from "../../public/icons";
import { useContext } from "react";
import { TranslationsContext } from "../../context/translations";
import img6 from "../../public/media/img6.png";
import img5 from "../../public/media/img5.png";
import img4 from "../../public/media/img4.png";
import img3 from "../../public/media/img3.png";
import img2 from "../../public/media/img2.png";
import img1 from "../../public/media/img1.png";

export function MainWhyDerek() {
  const { ref: section, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
  });

  const { t } = useContext(TranslationsContext);

  const gridCards = [
    {
      id: 1,
      title: t["stats.stat1_title"],
      desc: t["stats.stat1_desc"],
      icon: img1,
    },
    {
      id: 2,
      title: t["stats.stat2_title"],
      desc: t["stats.stat2_desc"],
      icon: img2,
    },
    {
      id: 3,
      title: t["stats.stat3_title"],
      desc: t["stats.stat3_desc"],
      icon: img3,
    },
    {
      id: 4,
      title: t["stats.stat4_title"],
      desc: t["stats.stat4_desc"],
      icon: img4,
    },
    {
      id: 5,
      title: t["stats.stat5_title"],
      desc: t["stats.stat5_desc"],
      icon: img5,
    },
    {
      id: 6,
      title: t["stats.stat6_title"],
      desc: t["stats.stat6_desc"],
      icon: img6,
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
              <b>Nima uchun DEREK?</b> #WeloveyourSMILE
            </p>
            <p>
              xt ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker includin
            </p>
          </div>
          <div className={styles.content_grid}>
            {gridCards.map((card) => {
              return (
                <div key={card.id} className={styles.content_grid_card}>
                  <span className={styles.content_grid_card_icon}>
                    <Image src={card.icon} alt={card.title} />
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
