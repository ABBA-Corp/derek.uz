import { useRouter } from "next/router";
import { createContext, useState, useEffect } from "react";

export const TranslationsContext = createContext();

export default function TranslationsContextProvider({ children }) {
  const { locale } = useRouter();

  const [t, setT] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  let translationsArray = [];

  async function getTranslations() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/translations`
    );
    if (!response.ok) {
      throw new Error("Data coud not be fetched!");
    } else {
      return response.json();
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getTranslations()
      .then((res) => {
        if (locale === "en") {
          setT(res.en);
        } else if (locale === "ru") {
          setT(res.ru);
        } else if (locale === "uz") {
          setT(res.uz);
        }
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }, [locale]);

  const value = { isLoading, setIsLoading, t, setT };

  return (
    <TranslationsContext.Provider value={value}>
      {children}
    </TranslationsContext.Provider>
  );
}
