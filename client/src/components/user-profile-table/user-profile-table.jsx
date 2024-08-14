import styles from "./user-profile-table.module.scss";
import { memo } from "react";

function UserProfileTable({ userData }) {
  return (
    <div className={styles.userProfileTable}>
      <div className={styles.keysValuesContainer}>
        {userData &&
          Object.entries(userData).map(([key, value]) => {
            const keyIsName = key === "name";
            return (
              <div key={key} className={styles.keyWithValue}>
                <p className={styles.key}>{key}</p>
                <p
                  className={`${styles.value} ${
                    keyIsName ? styles.nameValue : ""
                  }`}
                >
                  {value}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default memo(UserProfileTable);
