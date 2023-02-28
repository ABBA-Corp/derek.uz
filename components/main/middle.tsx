import Image from "next/image";
import { useInView } from "react-intersection-observer";
import styles from "../../styles/home.module.css";
import { MotionSection } from "./motion-section";
import logo from "../../public/media/footer_derek.png";
import myVideo from "../../public/media/video.mp4";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../context/modal";
import { gobottom } from "../../pages/_app";
import { TranslationsContext } from "../../context/translations";

export function MainMiddleBanner() {
  const { t } = useContext(TranslationsContext);
  const { setIsModal, setModalCase } = useContext(ModalContext);
  const { ref: section, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
  });

  const content = [
    {
      id: 1,
      title: t["main.step1_title"],
      description: t["main.step1_desc"],
      image: myVideo,
    },
    {
      id: 2,
      title: t["main.step2_title"],
      description: t["main.step2_desc"],
      image: myVideo,
    },
    {
      id: 3,
      title: t["main.step3_title"],
      description: t["main.step3_desc"],
      image: myVideo,
    },
  ];

  const [currentTab, setCurrentTab] = useState<number>(1);

  const render = () => {
    let change = function () {
      if (currentTab === 3) {
        clearInterval(id);
        setCurrentTab(1);
      } else {
        setCurrentTab(currentTab + 1);
      }
    };
    let id = setInterval(change, 10000);
  };

  useEffect(() => {
    render();
  }, [currentTab]);

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
                    style={{ display: "none" }}
                    className={styles.next_steps}
                    onClick={render}
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
