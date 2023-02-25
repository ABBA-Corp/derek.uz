import Link from "next/link";
import { useContext } from "react";
import { TranslationsContext } from "../../context/translations";
import { xBtn } from "../../public/icons";
import styles from "./menu.module.css";

type Props = {
  isMenu: boolean;
  setIsMenu: Function;
};

export function NavMenu({ isMenu, setIsMenu }: Props) {
  const { t } = useContext(TranslationsContext);

  return (
    <div className={isMenu ? `${styles.menu} ${styles.show}` : styles.menu}>
      <div className={`box ${styles.main_container}`}>
        <nav className={styles.main_nav}>
          <Link href={"/"}>{t["main.main"]}</Link>
          <Link href={"/about"}>{t["main.about"]}</Link>
          <Link href={"/news"}>{t["main.all_news"]}</Link>
          <Link href={"/category"}>{t["main.all_categories"]}</Link>
        </nav>
        <button className={styles.xBtn} onClick={() => setIsMenu(false)}>
          {xBtn}
        </button>
      </div>
    </div>
  );
}
