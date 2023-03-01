import { Layout } from "../../components/layout/layout";
import { NewsCard } from "../../components/newsCard/newsCard";
import { useInView } from "react-intersection-observer";
import { CustomHead } from "../../components/layout/head";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { url } from "../_app";
import { TranslationsContext } from "../../context/translations";

export default function NewsPage() {
  const { locale } = useRouter();
  const [news, setNews] = useState<any>([]);

  async function getAllNews() {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/articles`,
      { headers: { language: locale } }
    );
    const news = await res.data;
    return news;
  }

  useEffect(() => {
    getAllNews()
      .then((res) => {
        setNews(res.results);
      })
      .catch((e) => console.log(e));
  }, [locale]);

  const { ref: cardRef, inView: cardIsVisible } = useInView({
    triggerOnce: true,
  });
  const { t } = useContext(TranslationsContext);
  return (
    <>
      <CustomHead
        title={`Derek  | ${t["bloginner.headh"]}`}
        desc={t["aboutinner.headdesc"]}
        canonical={`${url}/news`}
      />
      <Layout>
        <section>
          <div className="box">
            <p className="section_title">{t["main.blognewsh"]}</p>
            <div className="mainGrid withGray">
              {news.map((singleNews: any, i: number) => {
                return (
                  <NewsCard
                    key={i}
                    i={i}
                    cardRef={cardRef}
                    cardIsVisible={cardIsVisible}
                    slug={singleNews.slug}
                    news={singleNews}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
