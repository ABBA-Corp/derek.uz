import "../styles/main.css";
import type { AppProps } from "next/app";
import TranslationsContextProvider from "../context/translations";
import SiteInfoContextProvider from "../context/siteinfo";
import ModalContextProvider from "../context/modal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SiteInfoContextProvider>
      <TranslationsContextProvider>
        <ModalContextProvider>
          <Component {...pageProps} />
        </ModalContextProvider>
      </TranslationsContextProvider>
    </SiteInfoContextProvider>
  );
}

export const url = "https://derek-ndc.vercel.app";

export const gobottom = () => {
  window.scrollTo(0, document.body.scrollHeight);
};
