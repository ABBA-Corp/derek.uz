import { useEffect, useRef, useState } from "react";
import { swiperArrow } from "../../public/icons";
import styles from "../../styles/home.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useInView } from "react-intersection-observer";
import { MotionSection } from "./motion-section";
import { ProductCard } from "../productCard/productCard";
import axios from "axios";
import { useRouter } from "next/router";

export function MainProducts() {
  const { locale } = useRouter();
  const [products, setProducts] = useState<any>([]);

  SwiperCore.use([Navigation]);

  const { ref: section, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
  });

  const prevBtn = useRef<HTMLButtonElement | null>(null);
  const nextBtn = useRef<HTMLButtonElement | null>(null);

  async function getProducts() {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_ENDPOINT + "/products",
      { headers: { language: locale } }
    );
    const data = await res.data;
    return data;
  }

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res.results);
      })
      .catch((e) => console.log(e));
  }, [locale]);

  return (
    <MotionSection motionRef={section} motionBoolean={sectionIsVisible}>
      <div className="box">
        <div className={styles.inner_top}>
          <h3 className="section_title">Top tovarlarimiz</h3>
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
              0: { slidesPerView: 1 },
              380: { slidesPerView: 2 },
              580: { slidesPerView: 3 },
              880: { slidesPerView: 4 },
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
            {products.map((product: any, i: number) => {
              return (
                <SwiperSlide key={i}>
                  <ProductCard slug={product.slug} product={product} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </MotionSection>
  );
}
