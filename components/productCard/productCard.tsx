import styles from "./productCard.module.css";
import noimage from "../../public/media/noimage.png";
import Image from "next/image";
import Link from "next/link";
import { swiperArrow } from "../../public/icons";

type Props = {
  i?: number;
  cardRef?: any;
  cardIsVisible?: boolean;
  slug: string | any;
  product: any;
};

export function ProductCard({ slug, product }: Props) {
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
};
