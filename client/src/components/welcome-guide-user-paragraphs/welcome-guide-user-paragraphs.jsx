// styles
import styles from "./welcome-guide-user-paragraphs.module.scss";

// react-router-dom lib
import { Link } from "react-router-dom";

// react lib
import { memo } from "react";

/**
 * WelcomeGuideUserParagraphs component.
 *
 * It renders two paragraphs above Table and below Searchbar components, in the Dashboard page.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.userLoggedIn - The name of the logged in user.
 * @param {string} props.kreateTvseriesRoute - A paragraph displaying a link to the create tvseries page.
 *
 * @returns {JSX.Element} The rendered WelcomeGuideUserParagraphs component.
 */
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
