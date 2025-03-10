// styles
import styles from "./footer.module.scss";

// icons
import { PiGithubLogo } from "react-icons/pi";
import { TbInfoTriangle } from "react-icons/tb";

// react-router-dom components
import { Link } from "react-router-dom";

/**
 * Footer component.
 *
 * It renders the footer of the web app, with a link to the github account of the developer
 * and a link to the privacy-notice page.
 *
 * @returns {JSX.Element} The rendered Footer component.
 */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a target="blank" href={"https://github.com/14githubruno"}>
        <PiGithubLogo aria-label="github icon" className={styles.githubLogo} />
      </a>
      <Link to={"/privacy-notice"}>
        <TbInfoTriangle aria-label="info icon" className={styles.infoIcon} />
      </Link>
    </footer>
  );
}
