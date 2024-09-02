import styles from "./loader.module.scss";

export default function Loader() {
  return (
    <article className={styles.loader}>
      <div role="figure" className={styles.spinner}></div>
    </article>
  );
}
