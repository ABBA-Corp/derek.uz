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

export default function AboutPage() {
  const { setInfo, setModalCase, setIsModal } = useContext(ModalContext);
  const { ref: statSection, inView: statSectionIsVisible } = useInView({
    triggerOnce: true,
  });

  const aboutStats = [
    {
      title: "Uzoq vaqt davomida turishi",
      desc: "xt ever since the 1500s, when an unknown printer took a ",
      icon: kachok,
    },
    {
      title: "Kosmetik tarafdan chiroyli",
      desc: "xt ever since the 1500s, when an unknown printer took a ",
      icon: tish,
    },
    {
      title: "Anti alergik hususiyati",
      desc: "xt ever since the 1500s, when an unknown printer took a ",
      icon: mikrob,
    },
    {
      title: "Odatiy tishlarga nisbatan 2 barobar mustahkamroq",
      desc: "xt ever since the 1500s, when an unknown printer took a ",
      icon: qalqon,
    },
    {
      title: "Anti alergik hususiyati",
      desc: "xt ever since the 1500s, when an unknown printer took a ",
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
                Korxonamiz haqida
              </p>
              <p
                className={`${styles.hero_desc} animate__animated animate__fadeInLeft animate__delay-700ms`}
              >
                sum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                pue the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not
                only five centuries, but alsosum is simply dummy text of the
                printing and typesetting industry. Lorem
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
                <p>Video ro&apos;lik</p>
              </button>
              <button className={styles.contact_btn} onClick={gobottom}>
                Biz bilan aloqa
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
              Nega aynan Derek ?
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
                sum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
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
