// styles
import styles from "./home-content-wrapper.module.scss";

/**
 * HomeContentWrapper component.
 *
 * It renders a wrapper for the homepage content.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The homepage components/children elements to be rendered within the wrapper.
 *
 * @returns {JSX.Element} The rendered HomeContentWrapper component.
 */
export default function HomeContentWrapper({ children }) {
  return <div className={styles.homeContentWrapper}>{children}</div>;
}
