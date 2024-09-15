import styles from "./loader.module.scss";

/**
 * Loader component.
 *
 * It renders a loader element.
 *
 * @returns {JSX.Element} The rendered Loader component.
 */
export default function Loader() {
  return (
    <article className={styles.loader}>
      <div role="figure" className={styles.spinner}></div>
    </article>
  );
}
