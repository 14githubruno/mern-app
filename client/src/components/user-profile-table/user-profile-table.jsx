// styles
import styles from "./user-profile-table.module.scss";

// custom lib
import { parseDateAndTime } from "../../lib/parse-date-and-time";

// set obj with time labels
const timestampsLabels = ["kreated", "updated"];

/**
 * UserProfileTable component.
 *
 * It renders a table in user profile page containing name, email and number of tvseries of user.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {object} props.userData - User data as name, email and number of owned tvseries.
 *
 * @returns {JSX.Element} The rendered UserProfileTable component.
 */
export default function UserProfileTable({ userData }) {
  return (
    <div className={styles.userProfileTable}>
      <div className={styles.keysValuesContainer}>
        {userData &&
          Object.entries(userData).map(([key, value]) => {
            const keyIsName = key === "name";
            const keyIsDate = timestampsLabels.includes(key.toLowerCase());
            return (
              <div key={key} className={styles.keyWithValue}>
                <p className={styles.key}>{key}</p>
                <p
                  className={`${styles.value} ${
                    keyIsName ? styles.nameValue : ""
                  }`}
                >
                  {value && keyIsDate ? parseDateAndTime(value) : value}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
