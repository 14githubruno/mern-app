import styles from "./welcome-guide-user-paragraphs.module.scss";
import { Link } from "react-router-dom";
import { memo } from "react";

/**
 * WelcomeGuideUserParagraphs component.
 * It renders two paragraphs above the table and below the searchbar, in the dashboard page.
 *
 * (The first paragraph is a welcoming message to the logged in user; the second one provides a link to the page where user can create a tvseries)
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.userLoggedIn - The name of the logged in user.
 * @param {string} props.kreateTvseriesRoute - A paragraph displaying a link to the page where user can create a tvseries (that is a future TableRow).
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
