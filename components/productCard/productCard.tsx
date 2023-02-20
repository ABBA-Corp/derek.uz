import styles from "./productCard.module.css";
import noimage from "../../public/media/noimage.png";
import Image from "next/image";
import Link from "next/link";
import { swiperArrow } from "../../public/icons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type Props = {
  i?: number;
  cardRef?: any;
  cardIsVisible?: boolean;
  slug: string | any;
  product: any;
};

export function ProductCard({
  i,
  cardRef,
  cardIsVisible,
  slug,
  product,
}: Props) {
  const { pathname } = useRouter();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth <= 580) {
      setIsMobile(true);
    }
  }, []);

  if (isMobile || pathname === "/") {
    return (
      <Link href={`/${slug}`} className={styles.product}>
        <div className={styles.product_img}>
          <Image
            src={product.image ? product.image : noimage}
            alt={product.product.name}
            width={240}
            height={200}
          />
        </div>
        <div className={styles.product_content}>
          <div className={styles.product_info}>
            <p className={styles.product_title}>{product.product.name}</p>
            <div
              className={styles.product_desc}
              dangerouslySetInnerHTML={{ __html: product.product.description }}
            ></div>
          </div>
          <div className={styles.tipa_btn}>{swiperArrow}</div>
        </div>
      </Link>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={cardIsVisible ? "animation" : ""}
      variants={{
        hidden: { x: -40, opacity: 0 },
        animation: {
          x: 0,
          opacity: 1,
          transition: { duration: 0.3, delay: i ? i * 0.2 : 0.2 },
        },
      }}
    >
      <Link href={`/${slug}`} className={styles.product}>
        <div className={styles.product_img}>
          <Image
            src={product.image ? product.image : noimage}
            alt={product.product.name}
            width={240}
            height={200}
          />
        </div>
        <div className={styles.product_content}>
          <div className={styles.product_info}>
            <p className={styles.product_title}>{product.product.name}</p>
            <div
              className={styles.product_desc}
              dangerouslySetInnerHTML={{ __html: product.product.description }}
            ></div>
          </div>
          <div className={styles.tipa_btn}>{swiperArrow}</div>
        </div>
      </Link>
    </motion.div>
  );
}

export const SearchProductCard = ({ product }: { product: any }) => {
  return (
    <Link href={`/${product.slug}`} className={styles.product}>
      <div className={styles.product_img}>
        <Image
          src={product.image ? product.image : noimage}
          alt={product.title ? product.title : "product image"}
          width={240}
          height={200}
        />
      </div>
      <div className={styles.product_content}>
        <div className={styles.product_info}>
          <p className={styles.product_title}>{product.name}</p>
          <div
            className={styles.product_desc}
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
        </div>
        <div className={styles.tipa_btn}>{swiperArrow}</div>
      </div>
    </Link>
  );
};
