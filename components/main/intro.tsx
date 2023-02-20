import styles from "../../styles/home.module.css";
import Image from "next/image";
import bigOgriq from "../../public/media/tish_back.png";
import intromini from "../../public/media/intro_mini.png";
import { logo } from "../../public/icons";
import { useContext } from "react";
import { ModalContext } from "../../context/modal";
import { gobottom } from "../../pages/_app";

export function MainIntro() {
  const { setIsModal, setModalCase } = useContext(ModalContext);
  return (
    <section>
      <div className={`box ${styles.intro_grid}`}>
        <div className={styles.intro_grid__left}>
          <span className={styles.mask}></span>
          <span className={styles.mask_left}></span>
          <div className={styles.intro_first}>
            <h1>Dentist Keramika</h1>
            <div className={styles.intro_first_buttons}>
              <button
                onClick={() => {
                  setModalCase("post");
                  setIsModal(true);
                }}
              >
                Sotib olish
              </button>
              <button onClick={gobottom}>Aloqa</button>
            </div>
          </div>
          <div className={styles.intro_last}>
            <div className={styles.intro__mini}>
              {logo}
              <p>Derek mahsuloti</p>
              <Image src={intromini} alt="background" className={styles.back} />
            </div>
            <div className={styles.boshogriq}>Derek Max 30 K</div>
          </div>
          <Image src={bigOgriq} alt="background" />
        </div>
        <div className={styles.intro_big}>
          {logo}
          <p>
            em Ipsum has been the industry&apos;s standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but{" "}
          </p>
        </div>
      </div>
    </section>
  );
}
