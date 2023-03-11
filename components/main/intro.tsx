import styles from "../../styles/home.module.css";
import Image from "next/image";
import bigOgriq from "../../public/media/tish_back.png";
import intromini from "../../public/media/intro_mini.jpg";
import { exclude, logo } from "../../public/icons";
import { useContext } from "react";
import { ModalContext } from "../../context/modal";
import { gobottom } from "../../pages/_app";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { TranslationsContext } from "../../context/translations";

export function MainIntro() {
  const { setIsModal, setModalCase } = useContext(ModalContext);

  const { ref: div1, inView: div1IsVisible } = useInView({
    triggerOnce: true,
  });

  const { ref: divS1, inView: divS1IsVisible } = useInView({
    triggerOnce: true,
  });

  const { ref: divS2, inView: divS2IsVisible } = useInView({
    triggerOnce: true,
  });

  const { ref: div3, inView: div3IsVisible } = useInView({
    triggerOnce: true,
  });
  const { t } = useContext(TranslationsContext);
  return (
    <section>
      <div className={`box ${styles.intro_grid}`}>
        <div className={styles.intro_grid__left}>
          <span className={styles.mask}></span>
          <span className={styles.mask_left}></span>
          <motion.div
            className={styles.intro_first}
            ref={div1}
            initial="hidden"
            animate={div1IsVisible ? "animation" : ""}
            variants={{
              hidden: { x: -40, opacity: 0 },
              animation: {
                x: 0,
                opacity: 1,
                transition: { duration: 0.5, delay: 0.4 },
              },
            }}
          >
            <span className={styles.exclude}>{exclude}</span>
            <span className={styles.exclude_end}>{exclude}</span>
            <h1>{t["main.hero_h"]}</h1>
            <div className={styles.intro_first_buttons}>
              <button
                onClick={() => {
                  setModalCase("post");
                  setIsModal(true);
                }}
              >
                {t["main.hero_purchase"]}
              </button>
              <button onClick={gobottom}>{t["main.hero_contact_btn"]}</button>
            </div>
          </motion.div>
          <div className={styles.intro_last}>
            <motion.div
              className={styles.intro__mini}
              ref={divS1}
              initial="hidden"
              animate={divS1IsVisible ? "animation" : ""}
              variants={{
                hidden: { y: 40, opacity: 0 },
                animation: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.5, delay: 0.6 },
                },
              }}
            >
              {logo}
              <p>{t["main.hero_derek_item"]}</p>
              <Image src={intromini} alt="background" className={styles.back} />
            </motion.div>
            <motion.div
              className={styles.boshogriq}
              ref={divS2}
              initial="hidden"
              animate={divS2IsVisible ? "animation" : ""}
              variants={{
                hidden: { y: 40, opacity: 0 },
                animation: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.5, delay: 0.8 },
                },
              }}
            >
              <span className={styles.exclude}>{exclude}</span>
              <span className={styles.exclude_end}>{exclude}</span>
              {t["main.hero_derek_max"]}
            </motion.div>
          </div>
          {/* <Image src={bigOgriq} alt="background" /> */}
        </div>
        <motion.div
          className={styles.intro_big}
          ref={div3}
          initial="hidden"
          animate={div3IsVisible ? "animation" : ""}
          variants={{
            hidden: { x: 40, opacity: 0 },
            animation: {
              x: 0,
              opacity: 1,
              transition: { duration: 0.5, delay: 1 },
            },
          }}
        >
          {logo}
          <p>{t["main.hero_desc"]}</p>
        </motion.div>
      </div>
    </section>
  );
}
