import { useContext, useEffect, useRef, useState } from "react";
import { swiperArrow } from "../../public/icons";
import styles from "../../styles/home.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { MotionSection } from "./motion-section";
import { useInView } from "react-intersection-observer";
import { NewsCard } from "../newsCard/newsCard";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { TranslationsContext } from "../../context/translations";

export function MainNews() {
  const { locale } = useRouter();
  const [news, setNews] = useState<any>([]);

  SwiperCore.use([Navigation]);

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

  const { ref: section, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
  });

  const prevBtn = useRef<HTMLButtonElement | null>(null);
  const nextBtn = useRef<HTMLButtonElement | null>(null);
  const { t } = useContext(TranslationsContext);
  return (
    <MotionSection motionRef={section} motionBoolean={sectionIsVisible}>
      <div className="box">
        <div className={styles.inner_top}>
          <h3 className="section_title">{t["main.blognewsh"]}</h3>
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
              0: { slidesPerView: 1 },
              580: { slidesPerView: 2.2 },
              880: { slidesPerView: 3.2 },
              1200: { slidesPerView: 4 },
            }}
            speed={1600}
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
      <div className={`box ${styles.new_divcha}`}>
        <p>{t["main.blognews_desc"]}</p>
        <Link href={"/news"}>{t["main.blogs_all"]}</Link>
      </div>
    </MotionSection>
  );
}
