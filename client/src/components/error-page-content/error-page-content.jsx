import styles from "./error-page-content.module.scss";
import Header from "../header/header";
import Footer from "../footer/footer";

export default function ErrorPageContent() {
  return (
    <main>
      <Header replace={true} />
      <section>
        <header>
          <h1 className={styles.headingOne}>
            This resource doesn't exist or kan't be found
          </h1>
        </header>
      </section>
      <Footer />
    </main>
  );
}
