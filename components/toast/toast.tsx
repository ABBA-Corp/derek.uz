import { galochka } from "../../public/icons";
import styles from "./toast.module.css";

type Props = {
  toastCase: string;
  isSuccess: boolean;
};

export function Toast({ toastCase, isSuccess }: Props) {
  switch (toastCase) {
    case "copy":
      return (
        <p
          className={
            isSuccess
              ? `${styles.toast} ${styles.show} ${styles.copy}`
              : styles.toast
          }
        >
          {galochka} Copied to clipboard!
        </p>
      );
    default:
      return (
        <p
          className={
            isSuccess
              ? `${styles.toast} ${styles.show} ${styles.message}`
              : styles.toast
          }
        >
          {galochka} Sent successfully!
        </p>
      );
  }
}
