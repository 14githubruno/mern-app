import styles from "./home-content-wrapper.module.scss";

export default function HomeContentWrapper({ children }) {
  return <div className={styles.homeContentWrapper}>{children}</div>;
}
