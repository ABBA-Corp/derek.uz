import { useEffect, useRef, useState } from "react";
import { swiperArrow } from "../../public/icons";
import styles from "../../styles/home.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { MotionSection } from "./motion-section";
import { useInView } from "react-intersection-observer";
import { NewsCard } from "../newsCard/newsCard";
import axios from "axios";
import { useRouter } from "next/router";

export function MainNews() {
  const { locale } = useRouter();
  const [news, setNews] = useState<any>([]);

  async function getAllNews() {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/articles`,
      { headers: { language: locale } }
    );
    const news = await res.data;
    return news;
  }

  useEffect(() => {
    getAllNews()
      .then((res) => {
        setNews(res.results);
      })
      .catch((e) => console.log(e));
  }, [locale]);

  SwiperCore.use([Navigation]);

  const { ref: section, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
  });

  const prevBtn = useRef<HTMLButtonElement | null>(null);
  const nextBtn = useRef<HTMLButtonElement | null>(null);

  return (
    <MotionSection motionRef={section} motionBoolean={sectionIsVisible}>
      <div className="box">
        <div className={styles.inner_top}>
          <h3 className="section_title">Blog va yangiliklar</h3>
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
        <div className="withGray">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={20}
            loop
            slidesPerView={"auto"}
            breakpoints={{
              0: { slidesPerView: 1.2 },
              580: { slidesPerView: 2.2 },
              880: { slidesPerView: 3.2 },
              1200: { slidesPerView: 6 },
            }}
            autoplay={{ delay: 2000, disableOnInteraction: true }}
            speed={1600}
            navigation={{
              prevEl: prevBtn.current,
              nextEl: nextBtn.current,
            }}
            onBeforeInit={(swiper: any) => {
              swiper.params.navigation.prevEl = prevBtn.current;
              swiper.params.navigation.nextEl = nextBtn.current;
            }}
          >
            {news.map((singleNews: any, i: number) => {
              return (
                <SwiperSlide key={i}>
                  <NewsCard slug={singleNews.slug} news={singleNews} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </MotionSection>
  );
}
