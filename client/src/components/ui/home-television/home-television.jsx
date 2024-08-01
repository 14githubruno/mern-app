import styles from "./home-television.module.scss";
import { PiTelevisionThin } from "react-icons/pi";

export default function HomeTelevision() {
  return (
    <div className={styles.tvWrapper}>
      <PiTelevisionThin className={styles.tv} />
    </div>
  );
}
