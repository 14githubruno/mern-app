import styles from "./loader.module.scss";

export default function Loader() {
  return (
    <article className={styles.loader}>
      <div className={styles.spinner}></div>
    </article>
  );
}
