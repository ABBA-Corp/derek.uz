import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { TelegramBanner } from "../../components/banner/banner";
import { CustomHead } from "../../components/layout/head";
import { Layout } from "../../components/layout/layout";
import { CategoryCard } from "../../components/main/categories";
import { TranslationsContext } from "../../context/translations";
import styles from "../../styles/home.module.css";
import { url } from "../_app";

export default function CategoryPage() {
  const { locale } = useRouter();
  const [categories, setCategories] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getCategories() {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_ENDPOINT + "/categories",
      { headers: { language: locale } }
    );
    const categories = await res.data;
    return categories;
  }

  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res.results);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((e) => console.log(e));
  }, []);

  const { ref: cardRef, inView: cardIsVisible } = useInView({
    triggerOnce: true,
  });
  const { t } = useContext(TranslationsContext);
  return (
    <>
      <CustomHead
        title={`Derek | ${t["category.headh"]}`}
        desc={t["category.head_desc"]}
        canonical={`${url}/category`}
      />
      <Layout>
        <section>
          <div className="miniBox">
            <p className="section_title">{t["category.headh"]}</p>
            <div className={`${styles.categories_grid_mini} withGray`}>
              {isLoading ? (
                <>
                  <div className={`skeleton ${styles.skeleton}`}></div>
                  <div className={`skeleton ${styles.skeleton}`}></div>
                  <div className={`skeleton ${styles.skeleton}`}></div>
                  <div className={`skeleton ${styles.skeleton}`}></div>
                  <div className={`skeleton ${styles.skeleton}`}></div>
                  <div className={`skeleton ${styles.skeleton}`}></div>
                  <div className={`skeleton ${styles.skeleton}`}></div>
                  <div className={`skeleton ${styles.skeleton}`}></div>
                </>
              ) : (
                categories.map((category: any, i: number) => {
                  return (
                    <CategoryCard
                      key={i}
                      i={i}
                      cardRef={cardRef}
                      cardIsVisible={cardIsVisible}
                      id={category.id}
                      title={category.name}
                    />
                  );
                })
              )}
            </div>
          </div>
        </section>
        <TelegramBanner />
      </Layout>
    </>
  );
}
