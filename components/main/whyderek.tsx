import Image from "next/image";
import { useInView } from "react-intersection-observer";
import styles from "../../styles/home.module.css";
import { MotionSection } from "./motion-section";
import mainImage from "../../public/media/fade_img.png";
import { kachok, mikrob, qalqon, tish } from "../../public/icons";

export function MainWhyDerek() {
  const { ref: section, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
  });

  const gridCards = [
    {
      id: 1,
      title: "Uzoq vaqt davomida turishi",
      desc: "xt ever since the 1500s, when an unknown printer took a ",
      icon: kachok,
    },
    {
      id: 2,
      title: "Kosmetik tarafdan chiroyli",
      desc: "xt ever since the 1500s, when an unknown printer took a ",
      icon: tish,
    },
    {
      id: 3,
      title: "Anti alergik hususiyati",
      desc: "xt ever since the 1500s, when an unknown printer took a ",
      icon: mikrob,
    },
    {
      id: 4,
      title: "Odatiy tishlarga nisbatan 2 barobar mustahkamroq",
      desc: "xt ever since the 1500s, when an unknown printer took a ",
      icon: qalqon,
    },
    {
      id: 5,
      title: "Odatiy tishlarga nisbatan 2 barobar mustahkamroq",
      desc: "xt ever since the 1500s, when an unknown printer took a ",
      icon: qalqon,
    },
    {
      id: 6,
      title: "Anti alergik hususiyati",
      desc: "xt ever since the 1500s, when an unknown printer took a ",
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
              <b>Nima uchun aynan DEREK?</b> #WeloveyourSMILE
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
