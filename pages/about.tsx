import { TelegramBanner } from "../components/banner/banner";
import { Layout } from "../components/layout/layout";
import { Partners } from "../components/partners/partners";
import styles from "../styles/about.module.css";
import heroImage from "../public/media/about_hero.jpg";
import Image from "next/image";
import { CustomHead } from "../components/layout/head";
import { Location } from "../components/location/location";
import { kachok, mikrob, play, qalqon, tish } from "../public/icons";
import { MotionSection } from "../components/main/motion-section";
import { useInView } from "react-intersection-observer";
import "animate.css";
import { gobottom, url } from "./_app";
import { useContext } from "react";
import { ModalContext } from "../context/modal";
import aboutVideo from "../public/media/video.mp4";
import { TranslationsContext } from "../context/translations";

export default function AboutPage() {
  const { setInfo, setModalCase, setIsModal } = useContext(ModalContext);
  const { ref: statSection, inView: statSectionIsVisible } = useInView({
    triggerOnce: true,
  });
  const { t } = useContext(TranslationsContext);
  const aboutStats = [
    {
      title: t["main.smile_h_1"],
      desc: t["main.smile_mini_desc1"],
      icon: kachok,
    },
    {
      title: t["main.smile_h_2"],
      desc: t["main.smile_mini_desc2"],
      icon: tish,
    },
    {
      title: t["main.smile_h_3"],
      desc: t["main.smile_mini_desc3"],
      icon: mikrob,
    },
    {
      title: t["main.smile_h_4"],
      desc: t["main.smile_mini_desc4"],
      icon: qalqon,
    },
    {
      title: t["main.smile_h_5"],
      desc: t["main.smile_mini_desc5"],
      icon: mikrob,
    },
  ];

  return (
    <>
      <CustomHead
        title={"Derek | About"}
        desc={"Derek haqida bir qancha yaxshi so`zlar"}
        canonical={`${url}/about`}
      />
      <Layout>
        <section className={styles.hero}>
          <Location currentPage={"About"} />
          <div className={`miniBox ${styles.hero_inner}`}>
            <div className={styles.hero_info}>
              <p
                className={`${styles.hero_title} animate__animated animate__fadeInLeft animate__delay-500ms`}
              >
                {t["about.h1"]}
              </p>
              <p
                className={`${styles.hero_desc} animate__animated animate__fadeInLeft animate__delay-700ms`}
              >
                {t["about.desc"]}
              </p>
            </div>
            <div
              className={`${styles.hero_buttons} animate__animated animate__fadeInUp animate__delay-1s`}
            >
              <button
                className={styles.play_btn}
                onClick={() => {
                  setInfo(aboutVideo);
                  setModalCase("info");
                  setIsModal(true);
                }}
              >
                <div>{play}</div>
                <p>{t["about.videobtn"]}</p>
              </button>
              <button className={styles.contact_btn} onClick={gobottom}>
                {t["about.contact_btn"]}
              </button>
            </div>
          </div>
          <Image src={heroImage} alt={"hero image"} priority={true} />
        </section>
        <MotionSection
          motionRef={statSection}
          motionBoolean={statSectionIsVisible}
          customClass={"class"}
        >
          <div className={`miniBox ${styles.stats_inner}`}>
            <p className={`section_title ${styles.centered_title}`}>
              {t["main.whyderek"]}?
            </p>
            <div className={styles.about_content}>
              <div className={styles.about_stats}>
                {aboutStats.map((stats: any, i: number) => {
                  return (
                    <div key={i} className={styles.stats_card}>
                      {stats.icon}
                      <div className={styles.stats_content}>
                        <p className={styles.stats_title}>{stats.title}</p>
                        <p className={styles.stats_desc}>{stats.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className={styles.desc}>
              {t["about.desc2"]}
              </p>
            </div>
          </div>
        </MotionSection>
        <TelegramBanner />
        <Partners layoutClass={"miniBox"} number={5} />
      </Layout>
    </>
  );
}
