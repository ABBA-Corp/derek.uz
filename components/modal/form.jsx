import axios from "axios";
import { useContext, useState } from "react";
import { IMaskInput } from "react-imask";
import { ModalContext } from "../../context/modal";
import { SiteInfoContext } from "../../context/siteinfo";
import { TranslationsContext } from "../../context/translations";
import { Toast } from "../toast/toast";
import styles from "./modal.module.css";

export function ModalForm() {
  const { siteInfo } = useContext(SiteInfoContext);
  const { order, setIsModal } = useContext(ModalContext);
  const [isSuccess, setIsSuccess] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const { t } = useContext(TranslationsContext);
  const channel =
    "https://api.telegram.org/bot6273572946:AAFPB99kVWMrOWoR9NCHoO3ziAzv0Nh1WTM/sendMessage?parse_mode=HTML&chat_id=-1001543538972&";

  async function postRequest(name, number, order) {
    const data = {
      first_name: name,
      nbm: `+998 ${number}`,
      product: order ? order.id : null,
    };

    const res = await axios.post(
      process.env.NEXT_PUBLIC_ENDPOINT + "/add_aplication",
      data
    );

    return await res;
  }

  async function postTelegram(order) {
    const res = await axios.get(
      `${channel}text=https://derek.abba.uz/admin/products/${order.product.id}`
    );
    const data = await res.data;
    return data;
  }

  const handleRequest = (e) => {
    e.preventDefault();
    postTelegram(order).then(() => setIsSuccess(true));
    postRequest(name, number, order)
      .then((res) => {
        if (res.status === 201) {
          setIsSuccess(true);
          setName("");
          setNumber("");
          setIsModal(false);
          setTimeout(() => {
            setIsSuccess(false);
          }, 2000);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleRequest}>
        <div className={styles.inputs_container}>
          <div className={styles.input_div}>
            <label htmlFor="name">{t["main.form_name"]}</label>
            <input
              type="text"
              id="name"
              placeholder={t["main.form_name"]}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.input_div}>
            <label htmlFor="name">{t["main.form_phone"]}</label>
            <div className={styles.withSpan}>
              <span>+998</span>
              <IMaskInput
                mask={"(00) 000 00 00"}
                id="name"
                placeholder={t["main.form_ephone"]}
                required
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.post_buttons}>
          <button type="submit">{t["main.form_send"]}</button>
          <a href={siteInfo.telegram} target={"_blank"} rel={"noreferrer"}>
            {t["main.form_sendtg"]}
          </a>
        </div>
      </form>
      <Toast toastCase="post" isSuccess={isSuccess} />
    </>
  );
}
