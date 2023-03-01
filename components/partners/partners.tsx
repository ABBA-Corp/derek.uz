import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { swiperArrow } from "../../public/icons";
import styles from "./partners.module.css";
import { MotionSection } from "../main/motion-section";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";
import axios from "axios";
import noimage from "../../public/media/noimage.png";
import { TranslationsContext } from "../../context/translations";

type Props = {
  number: number;
  layoutClass: string;
};

export function Partners({ number, layoutClass }: Props) {
  const { locale } = useRouter();
  const [partners, setPartners] = useState<any>([]);

  async function getPartners() {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/partners`,
      {
        headers: { language: locale },
      }
    );

    const partners = await res.data;
    return partners;
  }

  useEffect(() => {
    getPartners()
      .then((res) => {
        setPartners(res.results);
      })
      .catch((e) => console.log(e));
  }, []);

  SwiperCore.use([Navigation]);

  const { ref: section, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
  });

  const prevBtn = useRef<HTMLButtonElement | null>(null);
  const nextBtn = useRef<HTMLButtonElement | null>(null);
  const { t } = useContext(TranslationsContext);
  return (
    <MotionSection motionRef={section} motionBoolean={sectionIsVisible}>
      <div className={`${layoutClass} ${styles.section_inner}`}>
        <div className={styles.inner_top}>
          <h3 className="section_title">{t["main.partners"]}</h3>
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
          modules={[Autoplay, Navigation]}
          spaceBetween={20}
          loop
          slidesPerView={"auto"}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            580: { slidesPerView: 2.2 },
            880: { slidesPerView: 3.2 },
            1200: { slidesPerView: number },
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
          {partners.map((partner: any, i: number) => {
            return (
              <SwiperSlide key={i}>
                <div className={styles.partner}>
                  <Image
                    src={partner.image ? partner.image : noimage}
                    alt={partner.name}
                    width={120}
                    height={120}
                    loading="lazy"
                    quality={100}
                  />
                  <div className={styles.partner_texts}>
                    <p className={styles.partner_title}>{partner.name}</p>
                    <div
                      className={styles.partner_desc}
                      dangerouslySetInnerHTML={{ __html: partner.deckription }}
                    ></div>
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
