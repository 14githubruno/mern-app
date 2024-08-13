import styles from "./user-profile-button-link-container.module.scss";
import { Link } from "react-router-dom";
import { memo } from "react";

function UserProfileButtonLinkContainer({ toggleModalToDelete }) {
  return (
    <div className={styles.userProfileButtonLinkContainer}>
      <button className={styles.buttonDelete} onClick={toggleModalToDelete}>
        Delete user
      </button>
      <Link className={styles.linkToUpdatePage} to={"/profile/update-user"}>
        Update user
      </Link>
    </div>
  );
}

export default memo(UserProfileButtonLinkContainer);
