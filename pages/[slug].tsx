import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { CustomHead } from "../components/layout/head";
import { Layout } from "../components/layout/layout";
import styles from "../styles/product.module.css";
import { url } from "./_app";
import Select from "react-select";
import { productCheck } from "../public/icons";
import noimage from "../public/media/noimage.png";
import { ModalContext } from "../context/modal";
import { TranslationsContext } from "../context/translations";
import { ProductCard } from "../components/productCard/productCard";

export default function ProductInnerPage() {
  const router = useRouter();
  const { slug } = router.query;

  const { setIsModal, setModalCase, setOrder, info, setInfo } =
    useContext(ModalContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [color, setColor] = useState(0);
  const [weight, setWeight] = useState(0);

  const [product, setProduct] = useState<any>({});
  const [products, setProducts] = useState<object[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");

  async function getProduct(slug: string | any) {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/products/${slug}`,
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
    if (router.isReady) {
      getProduct(slug)
        .then((res) => {
          setProduct(res);
          setOrder(res);
          setWeight(res.atributs.length > 0 && res.atributs[0].options[0].id);
          setCategoryName(res.product.category.name);
          getProducts(res.product.category.id)
            .then((res) => {
              setProducts(res.results);
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
    }
  }, [router.query, router.locale]);

  async function checkVariant() {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/get_product_variant?product=${product.product?.slug}&color=${color}&option_1=${weight}`,
      { headers: { language: router.locale } }
    );
    const data = res.data;
    return data;
  }

  const getVariant = () => {
    checkVariant()
      .then((res) => {
        setIsLoading(true);
        if (res.id === undefined) {
          setIsError(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        } else {
          setIsError(false);
          setOrder(res);
          setProduct(res);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      })
      .catch((e) => console.log(e));
  };

  const weightOptions: any = [];
  product.atributs
    ? product.atributs[0]?.options.map((massa: any) => {
        weightOptions.push({ value: massa.id, label: massa.name });
      })
    : null;

  const colorOptions: any = [];
  product.colors?.map((color: any) => {
    colorOptions.push({ value: color.id, label: color.name });
  });

  const handleColorSelect = (option: any) => {
    setColor(option.value);
  };

  const handleWeightSelect = (option: any) => {
    setWeight(option.value);
    getVariant();
  };

  const { t } = useContext(TranslationsContext);

  return (
    <>
      <CustomHead
        title={`Derek | ${product.product?.name}`}
        desc={product.product?.description}
        canonical={`${url}/${slug}`}
      />
      <Layout>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <section>
            <div className={`box ${styles.product_inner}`}>
              <div className={styles.inner_top}>
                <Image
                  src={product.image ? product.image : noimage}
                  alt={product.product?.name}
                  width={520}
                  height={520}
                  onClick={() => {
                    setInfo(product.image ? product.image : null);
                    if (info !== null) {
                      setModalCase("info");
                      setIsModal(true);
                    }
                  }}
                />
                <div className={styles.product_content}>
                  <p className={styles.sotuvda_mavjud}>
                    {productCheck} {t["product_inner.have"]}
                  </p>
                  <p className={styles.product_title}>
                    {product.product?.name}
                  </p>
                  <div className={styles.select_container}>
                    <div className={styles.select_div}>
                      <p>{t["product_inner.color"]}:</p>
                      <Select
                        defaultValue={color}
                        onChange={handleColorSelect}
                        options={colorOptions}
                        className={styles.mySelect}
                      ></Select>
                    </div>
                    <div className={styles.select_div}>
                      <label htmlFor="massa">
                        {t["product_inner.weight"]}:
                      </label>
                      <Select
                        defaultValue={weight}
                        onChange={handleWeightSelect}
                        options={weightOptions}
                        className={styles.mySelect}
                      ></Select>
                    </div>
                  </div>
                  {isError ? (
                    <p className={styles.error_message}>
                      {t["product_inner.no_product"]}
                    </p>
                  ) : null}
                  <ul className={styles.product_info_list}>
                    <li className={styles.product_info_single}>
                      <p className={styles.info_single_key}>
                        {t["product_inner.code"]}:
                      </p>
                      <p className={styles.info_single_value}>{product.code}</p>
                    </li>
                    <li className={styles.product_info_single}>
                      <p className={styles.info_single_key}>
                        {t["product_inner.category"]}:
                      </p>
                      <p className={styles.info_single_value}>
                        {product.product?.category.name}
                      </p>
                    </li>
                    <li className={styles.product_info_single}>
                      <p className={styles.info_single_key}>
                        {t["product_inner.manufacturer"]}:
                      </p>
                      <p className={styles.info_single_value}>
                        {product.product?.manufacturer
                          ? product.product?.manufacturer
                          : `${t["product_inner.nothing_found"]}`}
                      </p>
                    </li>
                    <li className={styles.product_info_single}>
                      <p className={styles.info_single_key}>
                        {t["product_inner.type"]}:
                      </p>
                      <p className={styles.info_single_value}>
                        {product.product?.type
                          ? product.product?.type
                          : `${t["product_inner.nothing_found"]}`}
                      </p>
                    </li>
                  </ul>
                  <div className={styles.product_info_single_price}>
                    <p className={styles.info_single_cost}>Cost:</p>
                    <p className={styles.info_single_price}>
                      {product.price} €
                    </p>
                  </div>
                  <button
                    aria-label="call to action"
                    className={styles.yagona_btn}
                    onClick={() => {
                      setModalCase("order");
                      setIsModal(true);
                    }}
                  >
                    {t["product_inner.buy_btn"]}
                  </button>
                </div>
              </div>
              <div
                className={styles.inner_bottom_desc}
                dangerouslySetInnerHTML={{
                  __html: product.product?.description,
                }}
              ></div>
            </div>
          </section>
        )}
        <section className="section">
          <div className="box">
            <h3 className="section_title">
              {categoryName} {t["category.productp1"]}
            </h3>
            <div className="mainGrid withGray">
              {products && products.length > 0
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
      </Layout>
    </>
  );
}

const LoadingSkeleton = () => {
  return (
    <section>
      <div className={`box ${styles.skeleton_grid}`}>
        <div className={`skeleton ${styles.skeleton_img}`}></div>
        <div className={styles.skeleton_flex}>
          <div className={`skeleton ${styles.skeleton}`}></div>
          <div className={`skeleton ${styles.skeleton}`}></div>
          <div className={`skeleton ${styles.skeleton}`}></div>
          <div className={`skeleton ${styles.skeleton}`}></div>
          <div className={`skeleton ${styles.skeleton}`}></div>
          <div className={`skeleton ${styles.skeleton}`}></div>
          <div className={`skeleton ${styles.skeleton}`}></div>
          <div className={`skeleton ${styles.skeleton}`}></div>
          <div className={`skeleton ${styles.skeleton}`}></div>
        </div>
      </div>
    </section>
  );
};
