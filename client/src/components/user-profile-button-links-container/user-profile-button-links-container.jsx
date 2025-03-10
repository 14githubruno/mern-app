// styles
import styles from "./user-profile-button-links-container.module.scss";

// react-router-dom lib
import { Link } from "react-router-dom";

/**
 * UserProfileButtonLinksContainer component.
 *
 * It renders two links and a button to be displayed in the user profile page.
 *
 * (One link to the dashboard, one link to update user page and one button to open modal to delete user acccount)
 *
 * @param {Object} props - The properties passed to the component.
 * @param {function} props.toggleModalToDelete - A function to toggle the modal delete visibility.
 *
 * @returns {JSX.Element} The rendered UserProfileButtonLinksContainer component.
 */
export default function UserProfileButtonLinksContainer({
  toggleModalToDelete,
}) {
  return (
    <div className={styles.userProfileButtonLinksContainer}>
      <div className={styles.links}>
        <Link
          className={`${styles.link} ${styles.linkToUpdatePage}`}
          to={"/profile/update-user"}
        >
          Update user
        </Link>
        <Link
          className={`${styles.link} ${styles.linkToDashboard}`}
          to={"/dashboard"}
        >
          Dashboard
        </Link>
      </div>
      <div>
        <button className={styles.buttonDelete} onClick={toggleModalToDelete}>
          Delete user
        </button>
      </div>
    </div>
  );
}
