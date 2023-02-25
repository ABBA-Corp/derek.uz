import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const TranslationsContext = createContext();

export default function TranslationsContextProvider({ children }) {
  const { locale } = useRouter();

  const [t, setT] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
        setT(res);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }, [locale]);

  const value = { isLoading, setIsLoading, t };

  return (
    <TranslationsContext.Provider value={value}>
      {children}
    </TranslationsContext.Provider>
  );
}
