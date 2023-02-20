import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ProductCard } from "../productCard/productCard";

type Props = {
  parentID?: number;
  categoryTitle?: string | any;
};

export function Products({ parentID, categoryTitle }: Props) {
  const { locale } = useRouter();
  const [products, setProducts] = useState<any>([]);

  const { ref: cardRef, inView: cardIsVisible } = useInView({
    triggerOnce: true,
  });

  async function getProducts() {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_ENDPOINT + "/products",
      { headers: { language: locale } }
    );
    const data = await res.data;
    return data;
  }

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res.results);
      })
      .catch((e) => console.log(e));
  }, [locale]);

  return (
    <section className="section">
      <div className={`box`}>
        <h3 className="section_title">
          {parentID ? `${categoryTitle} uchun tovarlarimiz` : "Barcha tovarlar"}
        </h3>
        <div className={`mainGrid withGray`}>
          {products.map((product: any, i: number) => {
            if (parentID) {
              if (parentID === product.product?.category.id) {
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
            } else {
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
          })}
        </div>
      </div>
    </section>
  );
}
