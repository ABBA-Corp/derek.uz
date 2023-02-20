import React, { useContext, useState } from "react";
import { Footer } from "./footer/footer";
import { Header } from "./header/header";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { TranslationsContext } from "../../context/translations";
import { Loading } from "../loading/loading";
import { SiteInfoContext } from "../../context/siteinfo";
import { ModalContext } from "../../context/modal";
import { Modal } from "../modal/modal";

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  const { pathname } = useRouter();
  const { siteInfo } = useContext(SiteInfoContext);
  const { isLoading } = useContext(TranslationsContext);
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const [isLangs, setIsLangs] = useState<boolean>(false);
  const { isModal } = useContext(ModalContext);

  return (
    <AnimatePresence>
      {isLoading ? (
        <Loading />
      ) : (
        <motion.div
          className="wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          <Header
            isMenu={isMenu}
            setIsMenu={setIsMenu}
            isLangs={isLangs}
            setIsLangs={setIsLangs}
          />
          <main style={{ paddingTop: pathname === "/about" ? "0px" : "auto" }}>
            {children}
          </main>
          <Footer siteInfo={siteInfo} />
          <div
            className={
              isMenu
                ? "popup show"
                : "popup"
                ? isLangs
                  ? "popup show"
                  : "popup"
                : ""
            }
          ></div>
          {isModal ? <Modal /> : null}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
