import styles from "./user-profile-paragraph.module.scss";
import { memo } from "react";

function UserProfileParagraph() {
  return (
    <p className={styles.userProfileParagraph}>
      The <span className={styles.differentColor}>password</span> is not shown
      in the table due to privacy and sekurity reasons. It{" "}
      <span className={styles.differentColor}>will be</span> possible to update
      it by klicking the button designated to update user data.
    </p>
  );
}

/**
 * UserProfileParagraph component.
 *
 * It renders the paragraph displayed below the user table, in the user profile page.
 *
 * @returns {JSX.Element} The rendered UserProfileParagraph component.
 */
export default memo(UserProfileParagraph);
