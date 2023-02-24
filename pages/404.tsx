import Image from "next/image";
import Link from "next/link";
import styles from "../styles/error.module.css";
import errorImage from "../public/media/error-sim.jpg";
import { CustomHead } from "../components/layout/head";
import { url } from "./_app";

export default function ErrorPage() {
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
              <p>XATOLIK YUZ BERDI</p>
            </div>
            <p className={styles.desc}>
              Ipsum has been the industry&apos;s standard dummy text ever since
              the 1500s, when an unknown printer took a
            </p>
          </div>
          <Image
            src={errorImage}
            alt={"Error image"}
            className={styles.error_img}
          />
          <Link href={"/"} className={styles.backhome}>
            Go home
          </Link>
        </div>
      </div>
    </>
  );
}
