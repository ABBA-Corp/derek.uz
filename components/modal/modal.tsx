import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../context/modal";
import { TranslationsContext } from "../../context/translations";
import { search, xBtn } from "../../public/icons";
import { ModalForm } from "./form";
import styles from "./modal.module.css";
import noimage from "../../public/media/noimage.png";

export function Modal() {
  const { modalCase, setIsModal, info } = useContext(ModalContext);

  useEffect(() => {
    if (window.innerWidth >= 880) {
      window.addEventListener("click", (e) => {
        const target = e.target as Element;
        if (target?.className === styles.modal) {
          setIsModal(false);
        } else if (target?.className === styles.modal_inner) {
          setIsModal(true);
        }
      });
    }
  }, []);

  return (
    <article className={styles.modal}>
      <div
        style={{
          maxWidth:
            modalCase === "info" ? "70%" : modalCase === "order" ? "900px" : "",
        }}
        className={styles.modal_inner}
      >
        {modalCase === "search" ? (
          <SearchContent />
        ) : modalCase === "post" ? (
          <PostContent />
        ) : modalCase === "order" ? (
          <PostProductContent />
        ) : modalCase === "info" ? (
          <ShowInfo info={info} />
        ) : null}
      </div>
    </article>
  );
}

const SearchContent = () => {
  const router = useRouter();
  const { setIsLoading } = useContext(TranslationsContext);
  const { setIsModal, setResults } = useContext(ModalContext);
  const [query, setQuery] = useState("");

  const handleSearch = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT}/search?q=${query}`
    );
    const data = await res.data;
    localStorage.setItem("results", JSON.stringify(data));
    setResults(data);
    setIsModal(false);
    router.push("/results");
    setIsLoading(false);
  };

  return (
    <div className={styles.modal_container}>
      <p>Поиск по сайту</p>
      <form className={styles.search_content} onSubmit={handleSearch}>
        <button type="submit">{search}</button>
        <input
          type="text"
          autoFocus
          placeholder="Nimadir qidiring!"
          required
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
};

const PostContent = () => {
  const { setIsModal } = useContext(ModalContext);

  return (
    <div className={styles.modal_container}>
      <div className={styles.post_content}>
        <div className={styles.post_top}>
          <p>Заполните форму</p>
          <button
            onClick={() => {
              setIsModal(false);
            }}
          >
            {xBtn}
          </button>
        </div>
        <ModalForm />
      </div>
    </div>
  );
};

const PostProductContent = () => {
  const { setIsModal, order } = useContext(ModalContext);

  return (
    <div className={styles.modal_container}>
      <div className={styles.post_content}>
        <div className={styles.post_top}>
          <p>Заполните форму</p>
          <button
            onClick={() => {
              setIsModal(false);
            }}
          >
            {xBtn}
          </button>
        </div>
        <ModalForm />
        <div className={styles.order_container}>
          <div className={styles.order_img}>
            <Image
              src={order.image ? order.image : noimage}
              alt={order.product?.name}
              width={400}
              height={220}
            />
          </div>
          <div className={styles.order_content}>
            <div className={styles.order_k_v}>
              <p className={styles.order_k}>Name:</p>
              <p>{order.product?.name}</p>
            </div>
            <div className={styles.order_k_v}>
              <p className={styles.order_k}>Artikul:</p>
              <p>{order.code}</p>
            </div>
            <div className={styles.order_k_v}>
              <p className={styles.order_k}>Производитель:</p>
              <p>{order.product?.manufacturer}</p>
            </div>
            <div className={styles.order_k_v}>
              <p className={styles.order_k}>Cost:</p>
              <p>{order.price} €</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShowInfo = ({ info }: { info: any }) => {
  const { setIsModal, setInfo } = useContext(ModalContext);

  return (
    <div className={styles.show_modal_container}>
      <button
        className={styles.info_btn}
        onClick={() => {
          setIsModal(false);
          setInfo(null);
        }}
      >
        {xBtn}
      </button>
      {info.endsWith("mp4") ? (
        <video controls muted autoPlay className={styles.video}>
          <source src={info} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={info}
          alt={"product image"}
          width={600}
          height={400}
          className={styles.info_img}
        />
      )}
    </div>
  );
};
