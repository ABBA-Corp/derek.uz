import Image from "next/image";
import { useInView } from "react-intersection-observer";
import styles from "../../styles/home.module.css";
import { MotionSection } from "./motion-section";
import logo from "../../public/media/footer_derek.png";
import one from "../../public/media/one.png";
import myVideo from "../../public/media/video.mp4";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../context/modal";
import { gobottom } from "../../pages/_app";

export function MainMiddleBanner() {
  const { setIsModal, setModalCase } = useContext(ModalContext);
  const { ref: section, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
  });

  const content = [
    {
      id: 1,
      title: "Kasal tishni tozalash",
      description:
        "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,",
      image: myVideo,
    },
    {
      id: 2,
      title: "Sog`lom tishni tozalash",
      description:
        "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,",
      image: myVideo,
    },
    {
      id: 3,
      title: "Aql tishini tozalash",
      description:
        "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,",
      image: myVideo,
    },
  ];

  const [currentTab, setCurrentTab] = useState<number>(1);

  useEffect(() => {
    setTimeout(() => {
      if (currentTab >= 3) {
        setCurrentTab(1);
      } else {
        setCurrentTab(currentTab + 1);
      }
    }, 10000);
  }, content);

  return (
    <MotionSection motionRef={section} motionBoolean={sectionIsVisible}>
      <div className={`box ${styles.middle_inner}`}>
        {content.map((c) => {
          if (currentTab === c.id) {
            return (
              <>
                <div key={c.id} className={styles.middle_first}>
                  <div className={styles.middle_first_content}>
                    <div className={styles.middle_first_inner}>
                      {/* <Image src={one} alt={"one"} /> */}
                      <div className={styles.animation_box}>
                        <svg className={styles.svg} viewBox="0 0 100 100">
                          <circle
                            className={styles.meter}
                            cx="50"
                            cy="50"
                            r="40"
                          />
                        </svg>
                        <p className={styles.animation}>{c.id}</p>
                      </div>
                      <p className={styles.middle_first_title}>{c.title}</p>
                    </div>
                    <p className={styles.middle_first_desc}>{c.description}</p>
                  </div>
                  <button
                    className={styles.next_steps}
                    onClick={() => {
                      if (currentTab >= 3) {
                        setCurrentTab(1);
                      } else {
                        setCurrentTab(currentTab + 1);
                      }
                    }}
                  >
                    Keyingi qadam
                  </button>
                </div>
                <div className={styles.middle_big}>
                  <p>{c.title}</p>
                  <Image src={logo} alt={"logo"} className={styles.logo} />
                  <video playsInline autoPlay loop muted>
                    <source src={c.image} type="video/mp4" />
                  </video>
                </div>
              </>
            );
          }
        })}
        <div className={styles.middle_last}>
          <div className={styles.middle_last_content}>
            <p>Savollaringiz bormi?</p>
            <p>
              birgina formani to’ldirish orqali biz malumotlarga ega bo’ling!{" "}
              <b>Konsulatatsiya mutlaqo bepul</b>
            </p>
          </div>
          <div className={styles.middle_last_buttons}>
            <button
              onClick={() => {
                setModalCase("post");
                setIsModal(true);
              }}
            >
              Zayavka qoldirish
            </button>
            <button onClick={gobottom}>Biz bilan aloqa</button>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
