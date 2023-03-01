import Image from "next/image";
import Link from "next/link";
import styles from "../styles/error.module.css";
import errorImage from "../public/media/error-sim.jpg";
import { CustomHead } from "../components/layout/head";
import { url } from "./_app";
import { useContext } from "react";
import { TranslationsContext } from "../context/translations";

export default function ErrorPage() {
  const { t } = useContext(TranslationsContext);
  return (
    <>
      <CustomHead
        title={"Error - 404"}
        desc={"Error"}
        canonical={`${url}/404`}
      />
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.content_container}>
            <div className={styles.inner_div}>
              <p>404</p>
              <p>{t["error.happened"]}</p>
            </div>
            <p className={styles.desc}>{t["error.desc"]}</p>
          </div>
          <Image
            src={errorImage}
            alt={"Error image"}
            className={styles.error_img}
          />
          <Link href={"/"} className={styles.backhome}>
            {t["error.gohome_btn"]}
          </Link>
        </div>
      </div>
    </>
  );
}
