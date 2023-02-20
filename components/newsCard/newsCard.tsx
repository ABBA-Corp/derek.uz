import Image from "next/image";
import styles from "./newsCard.module.css";
import noimage from "../../public/media/noimage.png";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type Props = {
  i?: number;
  cardRef?: any;
  cardIsVisible?: boolean;
  slug: string | any;
  news: object | any;
};

export function NewsCard({ i, cardRef, cardIsVisible, slug, news }: Props) {
  const { pathname, locale } = useRouter();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth <= 580) {
      setIsMobile(true);
    }
  }, []);

  if (isMobile || pathname === "/") {
    return (
      <Link href={`/news/${slug}`} className={styles.card}>
        <div className={styles.card_img}>
          <Image
            src={news.image ? news.image : noimage}
            alt={news.title}
            width={240}
            height={200}
          />
        </div>
        <div className={styles.card_content}>
          <p className={styles.card_title}>{news.title}</p>
          <p className={styles.card_desc}>{news.subtitle}</p>
          <p className={styles.card_date}>
            {news.created_date.substring(0, 10)}
          </p>
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
        hidden: { x: -20, opacity: 0 },
        animation: {
          x: 0,
          opacity: 1,
          transition: { duration: 0.3, delay: i ? i * 0.2 : 0.2 },
        },
      }}
    >
      <Link href={`/news/${slug}`} className={styles.card}>
        <div className={styles.card_img}>
          <Image
            src={news.image ? news.image : noimage}
            alt={news.title}
            width={240}
            height={200}
          />
        </div>
        <div className={styles.card_content}>
          <p className={styles.card_title}>{news.title}</p>
          <p className={styles.card_desc}>{news.subtitle}</p>
          <p className={styles.card_date}>
            {news.created_date.substring(0, 10)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export const SearchNewsCard = ({ article }: { article: any }) => {
  return (
    <Link href={`/news/${article.slug}`} className={styles.card}>
      <div className={styles.card_img}>
        <Image
          src={article.image ? article.image : noimage}
          alt={article.title ? article.title : "news image"}
          width={240}
          height={200}
        />
      </div>
      <div className={styles.card_content}>
        <p className={styles.card_title}>{article.title}</p>
        <p className={styles.card_desc}>{article.subtitle}</p>
        <p className={styles.card_date}>
          {article.created_date.substring(0, 10)}
        </p>
      </div>
    </Link>
  );
};
