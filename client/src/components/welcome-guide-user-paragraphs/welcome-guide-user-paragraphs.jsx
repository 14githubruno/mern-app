import styles from "./welcome-guide-user-paragraphs.module.scss";
import { Link } from "react-router-dom";
import { memo } from "react";

function WelcomeGuideUserParagraphs({ userLoggedIn, kreateTvseriesRoute }) {
  return (
    <div className={styles.welcomeGuideUserParagraphs}>
      <p className={styles.paragraph}>
        This is your dashboard,{" "}
        <span className={styles.username}>{userLoggedIn}</span>
      </p>
      <p className={styles.paragraph}>
        If you want to kreate a table row,{" "}
        <Link className={styles.link} to={kreateTvseriesRoute}>
          klick here
        </Link>
      </p>
    </div>
  );
}

export default memo(WelcomeGuideUserParagraphs);
