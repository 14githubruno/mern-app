// styles
import { useState } from "react";
import styles from "./privacy-page-content.module.scss";

/**
 * PrivacyPageContent component.
 *
 * It renders the main content of the privacy page.
 *
 * @returns {JSX.Element} The rendered PrivacyPageContent component.
 */
export default function PrivacyPageContent() {
  const [isK, setIsK] = useState(false);

  const cOrK = (
    <span className={`${isK ? styles.kLetter : ""}`}>{isK ? "k" : "c"}</span>
  );

  return (
    <div className={styles.privacyPageContent}>
      <p className={styles.paragraph}>
        {
          "This application is a personal learning project and thus to be considered a playground. The main goal is to experiment with technologies and dive deeper in web development (hence, the application may be taken down at any time, without notice)."
        }
      </p>
      <button className={styles.btn} onClick={() => setIsK((prev) => !prev)}>
        {isK
          ? "Enough, I want to read the following text in a proper language"
          : "In the spirit of the app, I want to read the following text with k instead of c"}
      </button>
      <div className={styles.titleAndParagraph}>
        <h2 className={styles.title}>
          Data {cOrK}olle
          {cOrK}
          tion and usage
        </h2>
        <p className={styles.paragraph}>
          This appli{cOrK}ation {cOrK}olle{cOrK}ts only the essential user data
          required to {cOrK}reate an a{cOrK}
          {cOrK}ount: 1. the email address, 2. the username, 3. the password.
          The email address must be valid, since it will be used for both a
          {cOrK}
          {cOrK}ount verifi{cOrK}ation and password re{cOrK}overy. Additionally,
          the data you {cOrK}reate within the appli{cOrK}
          ation (e.g., tvseries information) is stored.
        </p>
      </div>
      <div className={styles.titleAndParagraph}>
        <h2 className={styles.title}>
          No tra{cOrK}
          king or {cOrK}
          ommercial use
        </h2>
        <p className={styles.paragraph}>
          This appli{cOrK}
          ation does not use {cOrK}
          ookies or any form of user tra{cOrK}
          king. Your data will not be used for {cOrK}
          ommercial purposes or shared with third parties.
        </p>
      </div>
      <div className={styles.titleAndParagraph}>
        <h2 className={styles.title}>Se{cOrK}urity</h2>
        <p className={styles.paragraph}>
          While reasonable se{cOrK}
          urity measures are in place, please be aware that this is a learning
          proje{cOrK}t. Thus, it is re{cOrK}ommended to use a dedi{cOrK}ated
          email address and a dedi{cOrK}ated password that you do not use for
          sensitive or personal {cOrK}ommuni{cOrK}ations.
        </p>
      </div>
      <div className={styles.titleAndParagraph}>
        <h2 className={styles.title}>
          User {cOrK}
          ontrol
        </h2>
        <p className={styles.paragraph}>
          You have the ability to delete your a{cOrK}
          {cOrK}
          ount and all associated data at any time. The deletion will be
          permanent and irreversible.
        </p>
      </div>
      <div className={styles.titleAndParagraph}>
        <h2 className={styles.title}>Liability</h2>
        <p className={styles.paragraph}>
          This appli{cOrK}
          ation is provided as-is, and the developer assumes no liability for
          any issues that may arise from its use.
        </p>
      </div>
    </div>
  );
}
