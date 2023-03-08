import { useRouter } from "next/router";
import { TelegramBanner } from "../../components/banner/banner";
import { Layout } from "../../components/layout/layout";
import { Location } from "../../components/location/location";
import styles from "../../styles/news.module.css";
import Image from "next/image";
import { share } from "../../public/icons";
import { CustomHead } from "../../components/layout/head";
import { useContext, useEffect, useState } from "react";
import { Toast } from "../../components/toast/toast";
import axios from "axios";
import noimage from "../../public/media/noimage.png";
import { url } from "../_app";
import { TranslationsContext } from "../../context/translations";

export default function NewsInnerpage() {
  const router = useRouter();
  const { isReady } = useRouter();
  const { slug } = router.query;

  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { t } = useContext(TranslationsContext);

  async function getSingleNews(slug: string | any) {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/articles/${slug}`,
      { headers: { language: router.locale } }
    );
    const data = await res.data;
    return data;
  }

  const [news, setNews] = useState<any>({});

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${url}/${slug}`).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  useEffect(() => {
    if (isReady) {
      setIsLoading(true);
      getSingleNews(slug)
        .then((res) => {
          setNews(res);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        })
        .catch(() => router.push("/404"));
    }
  }, [router]);

  return (
    <>
      <CustomHead
        title={news.title}
        desc={news.title}
        canonical={`${url}/${slug}`}
      />
      <Layout>
        <Location
          currentPage={news.title}
          parentPage={{ text: t["main.yangiliklar"], url: "/news" }}
        />
        <section>
          <div className={`miniBox`}>
            {isLoading ? (
              <div className={`skeleton ${styles.skeleton}`}></div>
            ) : (
              <>
                <div className={styles.inner_page_top}>
                  <p className={styles.inner_page_title}>{news.title}</p>
                  <div className={styles.inner_page_top__div}>
                    <button
                      className={styles.share_btn}
                      onClick={copyToClipboard}
                    >
                      {share}
                    </button>
                    <p className={styles.news_date}>
                      {news.created_date.substring(0, 10)}
                    </p>
                  </div>
                </div>
                <Image
                  src={news.image ? news.image : noimage}
                  alt={news.title}
                  className={styles.news_img}
                  width={1380}
                  height={500}
                  quality={100}
                  loading="lazy"
                />
                <div
                  className={styles.news_desc}
                  dangerouslySetInnerHTML={{ __html: news.body }}
                ></div>
              </>
            )}
          </div>
        </section>
        <TelegramBanner />
        <Toast isSuccess={isCopied} toastCase={"copy"} />
      </Layout>
    </>
  );
}
