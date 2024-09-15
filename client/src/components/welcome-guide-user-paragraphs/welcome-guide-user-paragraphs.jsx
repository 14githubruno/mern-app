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

/**
 * WelcomeGuideUserParagraphs component.
 *
 * It renders two paragraphs above the table and below the searchbar, in the dashboard page.
 *
 * (The first is a welcome message to the logged in user; the second one provides a link to the create tvseries page)
 *
 * (Each tvseries created will be a TableRow in the Table)
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.userLoggedIn - The name of the logged in user.
 * @param {string} props.kreateTvseriesRoute - A paragraph displaying a link to the create tvseries page.
 *
 * @returns {JSX.Element} The rendered WelcomeGuideUserParagraphs component.
 */
export default memo(WelcomeGuideUserParagraphs);
