import styles from "./user-profile-button-links-container.module.scss";
import { Link } from "react-router-dom";
import { memo } from "react";

function UserProfileButtonLinksContainer({ toggleModalToDelete }) {
  return (
    <div className={styles.userProfileButtonLinkContainer}>
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
      <button className={styles.buttonDelete} onClick={toggleModalToDelete}>
        Delete user
      </button>
    </div>
  );
}

export default memo(UserProfileButtonLinksContainer);
