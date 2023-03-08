import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { TranslationsContext } from "../../context/translations";
import { ProductCard } from "../productCard/productCard";

type Props = {
  parentID?: number;
  categoryTitle?: string | any;
};

export function Products({ parentID, categoryTitle }: Props) {
  const { locale } = useRouter();
  const [products, setProducts] = useState<object[]>([]);

  const { ref: cardRef, inView: cardIsVisible } = useInView({
    triggerOnce: true,
  });

  async function getProducts(categoryId: any) {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/products?category=${categoryId}`,
      { headers: { language: locale } }
    );
    const data = await res.data;
    return data;
  }

  useEffect(() => {
    getProducts(parentID)
      .then((res) => {
        setProducts(res.results);
      })
      .catch((e) => console.log(e));
  }, [locale]);

  const { t } = useContext(TranslationsContext);

  return (
    <section className="section">
      <div className={`box`}>
        <h3 className="section_title">
          {parentID
            ? `${categoryTitle} ${t["category.productp1"]}`
            : `${t["category.all_products"]}`}
        </h3>
        <div className={`mainGrid withGray`}>
          {products && products.length > 0
            ? products.map((product: any, i: number) => {
                if (parentID && parentID === product.product?.category.id) {
                  return (
                    <ProductCard
                      key={i}
                      cardRef={cardRef}
                      cardIsVisible={cardIsVisible}
                      slug={product.slug}
                      i={i}
                      product={product}
                    />
                  );
                }
              })
            : null}
        </div>
      </div>
    </section>
  );
}
