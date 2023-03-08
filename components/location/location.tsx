import Link from "next/link";
import { useContext } from "react";
import { TranslationsContext } from "../../context/translations";
import { arrowLeft } from "../../public/icons";
import styles from "./location.module.css";

type Props = {
  currentPage: string | any;
  parentPage?: {
    text: string | any;
    url: string | any;
  };
};

export function Location({ currentPage, parentPage }: Props) {
  const { t } = useContext(TranslationsContext);

  return (
    <section>
      <div className={`miniBox`}>
        <div className={styles.wrapper}>
          <Link
            href={parentPage ? parentPage.url : "/"}
            className={styles.back_button}
          >
            {arrowLeft} {t["main.nazad"]}
          </Link>
          <nav className={styles.nav}>
            <Link href={"/"} className={styles.element}>
              {t["main.asosiy"]}
            </Link>
            <span className={styles.element}>/</span>
            {parentPage ? (
              <>
                <Link href={`/${parentPage.url}`} className={styles.element}>
                  {parentPage.text}
                </Link>
                <span className={styles.element}>/</span>
              </>
            ) : null}
            <p className={styles.element}>{currentPage}</p>
          </nav>
        </div>
      </div>
    </section>
  );
}
