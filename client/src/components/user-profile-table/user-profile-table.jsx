import styles from "./user-profile-table.module.scss";
import { memo } from "react";

function UserProfileTable({ data }) {
  return (
    <div className={styles.userProfileTable}>
      <div className={styles.keysValuesContainer}>
        {data &&
          Object.entries(data).map(([key, value]) => (
            <div className={styles.keyWithValue}>
              <p className={styles.key}>{key}</p>
              <p className={styles.value}>{value}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default memo(UserProfileTable);
