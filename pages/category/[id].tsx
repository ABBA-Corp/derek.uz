import { useRouter } from "next/router";
import { Feedbacks } from "../../components/feedbacks/feedbacks";
import { CustomHead } from "../../components/layout/head";
import { Layout } from "../../components/layout/layout";
import { Products } from "../../components/products/product";
import styles from "../../styles/category.module.css";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { url } from "../_app";
import { TranslationsContext } from "../../context/translations";
import { ProductCard } from "../../components/productCard/productCard";

export default function SingleCategory() {
  const router = useRouter();
  const { isReady } = useRouter();
  const { id } = router.query;

  const [category, setCategory] = useState<any>({});
  const [products, setProducts] = useState<object[]>([]);

  async function getSingleCategory(id: string | any) {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/categories/${id}`,
      { headers: { language: router.locale } }
    );
    const data = await res.data;
    return data;
  }

  async function getProducts(categoryId: any) {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/products?category=${categoryId}`,
      { headers: { language: router.locale } }
    );
    const data = await res.data;
    return data;
  }

  useEffect(() => {
    if (isReady) {
      getSingleCategory(id)
        .then((res) => {
          setCategory(res);
        })
        .catch(() => router.push("/404"));
      getProducts(id)
        .then((res) => {
          setProducts(res.results);
        })
        .catch((e) => console.log(e));
    }
  }, [router]);
  const { t } = useContext(TranslationsContext);
  return (
    <>
      <CustomHead
        title={category.name}
        desc={category.name}
        canonical={`${url}/${id}`}
      />
      <Layout>
        <section>
          <div className={`box ${styles.intro_inner}`}>
            <div className={styles.intro_content}>
              <p className={styles.category_title}>{category.name}</p>
              <div
                className={styles.category_desc}
                dangerouslySetInnerHTML={{ __html: category.deckription }}
              ></div>
              <a
                href={category.cotalog}
                aria-label="download"
                className={styles.download_btn}
                target={"_blank"}
                rel={"noreferrer"}
              >
                {t["category.download_btn"]}
              </a>
            </div>
            <div className={styles.intro_info}>
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.name}
                  className={styles.category_img}
                  width={810}
                  height={450}
                />
              ) : null}
            </div>
          </div>
        </section>
        <section className="section">
          <div className="box">
            <h3 className="section_title">
              {category.name} {t["category.productp1"]}
            </h3>
            <div className="mainGrid withGray">
              {products.length > 0
                ? products.map((product: any, i: number) => {
                    return (
                      <ProductCard
                        key={i}
                        product={product}
                        slug={product.slug}
                      />
                    );
                  })
                : null}
            </div>
          </div>
        </section>
        <Feedbacks />
      </Layout>
    </>
  );
}
