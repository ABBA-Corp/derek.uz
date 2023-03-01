import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { star, swiperArrow } from "../../public/icons";
import styles from "./feedbacks.module.css";
import noimage from "../../public/media/noimage.png";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { MotionSection } from "../main/motion-section";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { useRouter } from "next/router";
import { TranslationsContext } from "../../context/translations";

export function Feedbacks() {
  const { locale } = useRouter();
  const [feedbacks, setFeedbacks] = useState<any>([]);

  SwiperCore.use([Navigation]);

  const { ref: section, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
  });

  const prevBtn = useRef<HTMLButtonElement | null>(null);
  const nextBtn = useRef<HTMLButtonElement | null>(null);

  async function getFeedbacks() {
    const res = await axios.get(process.env.NEXT_PUBLIC_ENDPOINT + "/reviews", {
      headers: { language: locale },
    });
    const data = await res.data;
    return data;
  }

  useEffect(() => {
    getFeedbacks()
      .then((res) => {
        setFeedbacks(res.results);
      })
      .catch((e) => console.log(e));
  }, [locale]);
  const { t } = useContext(TranslationsContext);
  return (
    <MotionSection motionRef={section} motionBoolean={sectionIsVisible}>
      <div className={`box ${styles.feedbacks_inner}`}>
        <div className={styles.inner_top}>
          <h3 className="section_title">{t["main.feedbacks_h"]}</h3>
          <div className={styles.buttons}>
            <button
              ref={prevBtn}
              className={styles.button}
              aria-label={"previous slide"}
            >
              {swiperArrow}
            </button>
            <button
              ref={nextBtn}
              className={styles.button}
              aria-label={"next slide"}
            >
              {swiperArrow}
            </button>
          </div>
        </div>
        <Swiper
          className={styles.feedbacks_swiper}
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: prevBtn.current,
            nextEl: nextBtn.current,
          }}
          onBeforeInit={(swiper: any) => {
            swiper.params.navigation.prevEl = prevBtn.current;
            swiper.params.navigation.nextEl = nextBtn.current;
          }}
          loop
          autoplay={{ delay: 2000, disableOnInteraction: true }}
          spaceBetween={20}
          slidesPerView={"auto"}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            580: { slidesPerView: 2.2 },
            1200: { slidesPerView: 4 },
          }}
          speed={1600}
        >
          {feedbacks.map((feedback: any, i: number) => {
            let stars = [];
            for (let i = 1; i <= feedback.rating; i++) {
              stars.push(star);
            }

            return (
              <SwiperSlide key={i}>
                <div className={styles.feedback}>
                  <div className={styles.feedback_main}>
                    <Image
                      src={feedback.image ? feedback.image : noimage}
                      alt={feedback.title}
                      className={styles.feedback_img}
                      width={100}
                      height={100}
                    />
                    <div className={styles.feedback_content}>
                      <p className={styles.feedback_title}>{feedback.title}</p>
                      <div
                        className={styles.feedback_desc}
                        dangerouslySetInnerHTML={{ __html: feedback.text }}
                      ></div>
                    </div>
                  </div>
                  <div className={styles.rating_div}>
                    {stars.map((star: any, i: number) => {
                      return (
                        <span
                          key={i}
                          style={{ display: "grid", placeItems: "center" }}
                        >
                          {star}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </MotionSection>
  );
}
