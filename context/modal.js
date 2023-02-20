import { createContext, useEffect, useState } from "react";

export const ModalContext = createContext();

export default function ModalContextProvider({ children }) {
  const [isModal, setIsModal] = useState();
  const [modalCase, setModalCase] = useState("post"); // search || post || info
  const [results, setResults] = useState({});
  const [order, setOrder] = useState(null);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const storageResults = JSON.parse(localStorage.getItem("results"));
    if (storageResults !== null) {
      setResults(storageResults);
    }
  }, []);

  const value = {
    isModal,
    setIsModal,
    modalCase,
    setModalCase,
    results,
    setResults,
    order,
    setOrder,
    info,
    setInfo,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
