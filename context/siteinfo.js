import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const SiteInfoContext = createContext();

export default function SiteInfoContextProvider({ children }) {
  const { isReady, locale } = useRouter();
  const [siteInfo, setSiteInfo] = useState({});

  async function getSiteInfo() {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_ENDPOINT + "/static_infos"
    );
    const data = await res.data;
    return data;
  }

  useEffect(() => {
    if (isReady) {
      getSiteInfo()
        .then((res) => {
          setSiteInfo(res);
        })
        .catch((e) => console.log(e));
    }
  }, []);

  return (
    <SiteInfoContext.Provider value={{ siteInfo }}>
      {children}
    </SiteInfoContext.Provider>
  );
}
