// styles
import styles from "./welcome-guide-user-paragraphs.module.scss";

// react-router-dom lib
import { Link } from "react-router-dom";

/**
 * WelcomeGuideUserParagraphs component.
 *
 * It renders two paragraphs above Table and below Searchbar components, in the Dashboard page.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.userLoggedIn - The name of the logged in user.
 * @param {string} props.kreateTvseriesRoute - A link to the create tvseries page.
 *
 * @returns {JSX.Element} The rendered WelcomeGuideUserParagraphs component.
 */
export default function WelcomeGuideUserParagraphs({
  userLoggedIn,
  kreateTvseriesRoute,
}) {
  return (
    <div className={styles.welcomeGuideUserParagraphs}>
      <p className={styles.paragraph}>
        This is your dashboard,{" "}
        <span className={styles.username}>{userLoggedIn}</span>
      </p>
      <Link className={styles.link} to={kreateTvseriesRoute}>
        Kreate a new table row &rarr;
      </Link>
    </div>
  );
}
