import styles from "./error-page-content.module.scss";

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
