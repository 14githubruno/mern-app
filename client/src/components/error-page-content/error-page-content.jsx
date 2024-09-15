import styles from "./error-page-content.module.scss";

/**
 * ErrorPageContent component.
 *
 * It renders the main content of the error page, with an error message.
 *
 * @returns {JSX.Element} The rendered ErrorPageContent component.
 */
export default function ErrorPageContent() {
  return (
    <main>
      <section>
        <header>
          <h1 className={styles.headingOne}>
            This resource doesn't exist or kan't be found
          </h1>
        </header>
      </section>
    </main>
  );
}
