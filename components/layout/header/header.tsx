import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { logo, play, search } from "../../../public/icons";
import { NavMenu } from "../../menu/menu";
import styles from "./header.module.css";
import uzb from "../../../public/media/uzb.png";
import rus from "../../../public/media/rus.png";
import gb from "../../../public/media/gb.png";
import { useContext } from "react";
import { TranslationsContext } from "../../../context/translations";
import { ModalContext } from "../../../context/modal";

type Props = {
  isMenu: boolean;
  setIsMenu: Function;
  isLangs: boolean;
  setIsLangs: Function;
};

export function Header({ isMenu, setIsMenu, isLangs, setIsLangs }: Props) {
  const router = useRouter();

  const { t } = useContext(TranslationsContext);
  const { isModal, setIsModal, setModalCase } = useContext(ModalContext);

  return (
    <>
      <header
        className={styles.header}
        style={{ borderRadius: isMenu ? "0px" : "0px 0px 20px 20px" }}
      >
        <div className={`box ${styles.header_inner}`}>
          <div className={styles.main_nav}>
            <button
              className={
                isMenu
                  ? `${styles.desktop_menu} ${styles.desktop_menu_dark}`
                  : styles.desktop_menu
              }
              onClick={() => setIsMenu(!isMenu)}
            >
              <div className={styles.desktop_hamburger}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p>{t["main.menu"]}</p>
            </button>
            <Link href={"/"}>{logo}</Link>
          </div>
          <div className={styles.extra_nav}>
            <button
              className={styles.search_div}
              aria-label={"search"}
              onClick={() => {
                setIsModal(!isModal);
                setModalCase("search");
              }}
            >
              {search}
            </button>
            <button
              className={
                isLangs
                  ? `${styles.lang_changer} ${styles.lang_changer_dark}`
                  : styles.lang_changer
              }
              onClick={() => setIsLangs(!isLangs)}
            >
              {router.locale === "uz"
                ? "O'zbekcha"
                : router.locale === "ru"
                ? "Русский"
                : router.locale === "en"
                ? " English"
                : ""}
              {play}
              <div
                className={
                  isLangs
                    ? `${styles.dropdown} ${styles.show}`
                    : styles.dropdown
                }
              >
                {router.locales?.map((locale) => {
                  if (locale === "uz") {
                    return (
                      <Link
                        key={locale}
                        href={router.asPath}
                        locale={locale}
                        className={styles.dropdown_link}
                      >
                        <Image src={uzb} alt={"lang"} /> O&apos;zbekcha
                      </Link>
                    );
                  } else if (locale === "ru") {
                    return (
                      <Link
                        key={locale}
                        href={router.asPath}
                        locale={locale}
                        className={styles.dropdown_link}
                      >
                        <Image src={rus} alt={"lang"} />
                        Русский
                      </Link>
                    );
                  } else if (locale === "en") {
                    return (
                      <Link
                        key={locale}
                        href={router.asPath}
                        locale={locale}
                        className={styles.dropdown_link}
                      >
                        <Image src={gb} alt={"lang"} />
                        English
                      </Link>
                    );
                  }
                })}
              </div>
            </button>
            <button
              className={styles.call_to_action}
              onClick={() => {
                setIsModal(!isModal);
                setModalCase("post");
              }}
            >
              Aloqa
            </button>
          </div>
        </div>
      </header>
      <NavMenu isMenu={isMenu} setIsMenu={setIsMenu} />
    </>
  );
}
