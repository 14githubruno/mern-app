import styles from "./footer.module.scss";
import { PiGithubLogo } from "react-icons/pi";
import { Link } from "react-router-dom";

/**
 * Footer component.
 * It renders the footer of the web app with a link to the github account of the developer.
 *
 * @returns {JSX.Element} The rendered Footer component.
 */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link target="blank" to={"https://github.com/14githubruno"}>
        <PiGithubLogo aria-label="github icon" className={styles.githubLogo} />
      </Link>
    </footer>
  );
}
