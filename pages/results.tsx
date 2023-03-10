import { useContext } from "react";
import { CustomHead } from "../components/layout/head";
import { Layout } from "../components/layout/layout";
import { ModalContext } from "../context/modal";
import { url } from "./_app";
import styles from "../styles/results.module.css";
import { SearchNewsCard } from "../components/newsCard/newsCard";
import { SearchCategoryCard } from "../components/main/categories";
import { SearchProductCard } from "../components/productCard/productCard";
import { TranslationsContext } from "../context/translations";

export default function SearchResultsPage() {
  const { results } = useContext(ModalContext);
  const { t } = useContext(TranslationsContext);

  return (
    <>
      <CustomHead
        title={"Search results"}
        desc={"Search results"}
        canonical={`${url}/results`}
      />
      <Layout>
        <section>
          <div className={`box ${styles.section_inner}`}>
            <h3 className="section_title">{t["search.title"]}</h3>
            <div className={styles.results_container}>
              {results.articles && results.articles.length > 0 ? (
                <div className={`mainGrid`}>
                  {results.articles.map((article: any, i: number) => {
                    return <SearchNewsCard key={i} article={article} />;
                  })}
                </div>
              ) : (
                <p>{t["search.text1"]}</p>
              )}

              {results.categories && results.categories.length > 0 ? (
                <div className={`withGray ${styles.categories_grid}`}>
                  {results.categories.map((category: any) => {
                    return (
                      <SearchCategoryCard
                        key={category.id}
                        category={category}
                      />
                    );
                  })}
                </div>
              ) : (
                <p>{t["search.text2"]}</p>
              )}
              {results.products && results.products.length > 0 ? (
                <div className={`mainGrid`}>
                  {results.products.map((product: any, i: number) => {
                    if (product) {
                      return <SearchProductCard key={i} product={product} />;
                    }
                  })}
                </div>
              ) : (
                <p>{t["search.text3"]}</p>
              )}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
