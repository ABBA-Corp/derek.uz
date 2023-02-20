import { Feedbacks } from "../components/feedbacks/feedbacks";
import { CustomHead } from "../components/layout/head";
import { Layout } from "../components/layout/layout";
import { MainBlueBanner } from "../components/main/bluebanner";
import { MainCategories } from "../components/main/categories";
import { MainCategoryBanner } from "../components/main/category_banner";
import { MainIntro } from "../components/main/intro";
import { MainMiddleBanner } from "../components/main/middle";
import { MainNews } from "../components/main/news";
import { MainProducts } from "../components/main/products";
import { MainWhyDerek } from "../components/main/whyderek";
import { Partners } from "../components/partners/partners";
import { url } from "./_app";

export default function Home({ data }: any) {
  const siteInfo = data.siteInfo;

  return (
    <>
      <CustomHead
        title={siteInfo.title}
        desc={siteInfo.deskription}
        canonical={url}
      />
      <Layout>
        <MainIntro />
        <MainCategories />
        <MainProducts />
        <MainMiddleBanner />
        <MainCategoryBanner />
        <MainBlueBanner />
        <MainWhyDerek />
        <MainNews />
        <Feedbacks />
        <Partners number={6} layoutClass={"box"} />
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const siteInfoRes = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/static_infos`,
    {
      cache: "no-cache",
    }
  );

  const returnedSiteInfo = await siteInfoRes.json();

  const data = {
    siteInfo: await returnedSiteInfo,
  };

  return { props: { data } };
}
