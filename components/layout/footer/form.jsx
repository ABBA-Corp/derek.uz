import axios from "axios";
import { useState } from "react";
import { IMaskInput } from "react-imask";
import { formSvg } from "../../../public/icons";
import { Toast } from "../../toast/toast";
import styles from "./footer.module.css";

export function FooterForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  async function postRequest(name, number) {
    const data = {
      first_name: name,
      nbm: `+998 ${number}`,
    };

    const res = await axios.post(
      process.env.NEXT_PUBLIC_ENDPOINT + "/add_aplication",
      data
    );

    return await res;
  }

  const handleRequest = (e) => {
    e.preventDefault();
    postRequest(name, number)
      .then((res) => {
        if (res.status === 201) {
          setIsSuccess(true);
          setName("");
          setNumber("");
          setTimeout(() => {
            setIsSuccess(false);
          }, 2000);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <form className={styles.footer_form} onSubmit={handleRequest}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className={styles.withSpan}>
          <span>+998</span>
          <IMaskInput
            mask={"(00) 000 00 00"}
            type="text"
            placeholder="Your number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" aria-label="send request">
          {formSvg}
        </button>
      </form>
      <Toast toastCase="post" isSuccess={isSuccess} />
    </>
  );
}
