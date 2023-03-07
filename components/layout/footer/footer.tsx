import styles from "./footer.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import {
  facebook,
  instagram,
  logo,
  telegram,
  youtube,
  footerLogo,
} from "../../../public/icons";
import { FooterForm } from "./form";
import { useContext } from "react";
import { SiteInfoContext } from "../../../context/siteinfo";
import { TranslationsContext } from "../../../context/translations";

export function Footer() {
  const { siteInfo } = useContext(SiteInfoContext);

  const images = [
    {
      img: logo,
    },
    {
      img: logo,
    },
    {
      img: logo,
    },
    {
      img: logo,
    },
    {
      img: logo,
    },
    {
      img: logo,
    },
    {
      img: logo,
    },
    {
      img: logo,
    },
    {
      img: logo,
    },
  ];

  const socialmedia = [
    {
      id: 1,
      title: "youtube",
      icon: youtube,
      url: siteInfo.youtube,
    },
    {
      id: 2,
      title: "telegram",
      icon: telegram,
      url: siteInfo.telegram,
    },
    {
      id: 3,
      title: "instagram",
      icon: instagram,
      url: siteInfo.instagram,
    },
    {
      id: 4,
      title: "facebook",
      icon: facebook,
      url: siteInfo.facebook,
    },
  ];

  const { t } = useContext(TranslationsContext);

  return (
    <footer className={styles.footer}>
      <div className={styles.swiper_wrapper}>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          loop
          slidesPerView={"auto"}
          breakpoints={{
            0: { slidesPerView: 2.8 },
            880: { slidesPerView: 4.2 },
            1200: { slidesPerView: 5.5 },
          }}
          autoplay={{
            delay: 100,
            disableOnInteraction: true,
          }}
          speed={20000}
        >
          {images.map((img: any, i: number) => {
            return (
              <SwiperSlide key={i}>
                <span className={styles.footer_derek}>{footerLogo}</span>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className={`box ${styles.footer_inner}`}>
        <div className={styles.footer_middle}>
          <div className={styles.middle_content_side}>
            <p className={styles.content_side_title}>{t["footer.contacth"]}</p>
            <p className={styles.content_side_desc}>
              {t["footer.contact_desc"]}
            </p>
          </div>
          <FooterForm />
        </div>
        <div className={styles.footer_bottom}>
          <p className={styles.motto}>{t["main.smile_makeover"]}</p>
          <nav className={styles.bottom_nav_container}>
            <div className={styles.nav_top}>
              <div className={styles.nav_top__div}>
                <p className={styles.nav_top__title}>United States</p>
                <nav className={styles.nav_top__nav}>
                  <p>
                    71 South Los Carneros Road, Goleta, California 93117
                    1-877-926-5184
                  </p>
                </nav>
              </div>
              <div className={styles.nav_top__div}>
                <p className={styles.nav_top__title}>Netherlands</p>
                <nav className={styles.nav_top__nav}>
                  <p>
                    71 South Los Carneros Road, Goleta, California 93117
                    1-877-926-5184
                  </p>
                </nav>
              </div>
              <div className={styles.nav_top__div}>
                <nav className={styles.nav_top__nav}>
                  <p>{t["footer.privacy_policy"]}</p>
                  <p>{t["footer.terms_of"]}</p>
                  <p>{t["footer.compliance"]}</p>
                  <p>{t["footer.cookie"]}</p>
                </nav>
              </div>
            </div>
            <div className={styles.nav_bottom}>
              <div className={styles.socialmedia}>
                {socialmedia.map((sm) => {
                  return (
                    <a
                      key={sm.id}
                      href={sm.url}
                      target={"_blank"}
                      rel={"noreferrer"}
                      aria-label={sm.title}
                    >
                      {sm.icon}
                    </a>
                  );
                })}
              </div>
              <div className={styles.copy_div}>
                <p>
                  &copy; {new Date().getFullYear()}, {t["footer.apeel"]}.
                </p>
                <p>{t["footer.allright"]}.</p>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}
