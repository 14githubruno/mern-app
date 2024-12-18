// styles
import styles from "./header.module.scss";

// icons
import { GiSouthKorea } from "react-icons/gi";
import { BiUser } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { RiProfileLine } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";

// react lib
import { useEffect, useRef } from "react";

// react-router-dom lib
import { Link, NavLink, useLocation } from "react-router-dom";

// redux
import { useSelector } from "react-redux";

// lib
import { useResetApiAndUser } from "../../hooks/use-reset-api-and-user";

/**
 * Header component.
 *
 * It renders the navigation bar of the web app.
 *
 * (The content of Header component changes depending on whether there is a logged in user)
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} [props.replace=false] - Replace the current history state when navigating. Defaults to false.
 *
 * @returns {JSX.Element} The rendered Header component.
 */
export default function Header({ replace = false }) {
  const dropdownRef = useRef(null);
  const secondDropdownRef = useRef(null);
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const resetAll = useResetApiAndUser();

  const showDropdownContent = (e) => {
    const dropdownIsOpen = dropdownRef?.current?.checked;
    if (user && !dropdownIsOpen) {
      dropdownRef.current.checked = true;
    }
    e.stopPropagation();
  };

  const hideDropdownContent = () => {
    const dropdownIsOpen = dropdownRef?.current?.checked;
    if (user && dropdownIsOpen) {
      dropdownRef.current.checked = false;
    }
  };

  const handleClickOutsideDropdown = (e) => {
    const target = e.target;
    const userIconIsTarget = secondDropdownRef?.current?.contains(target);
    const dropdownIsOpen = dropdownRef?.current?.checked;

    if (user && !userIconIsTarget && !dropdownIsOpen) {
      return;
    } else {
      if (dropdownRef?.current) {
        return (dropdownRef.current.checked = false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideDropdown);

    return () =>
      document.removeEventListener("click", handleClickOutsideDropdown);
  }, []);

  const navbar_with_user = (
    <nav className={styles.nav}>
      <label aria-hidden="true" className={styles.labelCheckbox}>
        <input
          tabIndex={"-1"}
          className={styles.checkbox}
          ref={dropdownRef}
          type="checkbox"
          id="checkbox used to handle dropdown"
        />
      </label>
      <div
        aria-haspopup="true"
        ref={secondDropdownRef}
        onClick={showDropdownContent}
        className={styles.userIconDropdownWrapper}
        id="user dropdown wrapper"
      >
        <BiUser aria-label="user icon" className={styles.userIcon} />
        <ul
          aria-labelledby="user dropdown wrapper"
          className={styles.dropdownContent}
        >
          <li>
            <Link
              className={`${styles.dropdownLink} ${styles.linkToDashboard} ${
                location.pathname === "/dashboard"
                  ? styles.linkToDashboardIsActive
                  : ""
              }`}
              to={"/dashboard"}
              replace={replace}
              onClick={(e) => {
                hideDropdownContent();
                e.stopPropagation();
              }}
            >
              <span>
                <RxDashboard aria-label="dashboard icon" />
              </span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              className={`${styles.dropdownLink} ${styles.linkToProfile} ${
                location.pathname === "/profile"
                  ? styles.linkToProfileIsActive
                  : ""
              }`}
              to={"/profile"}
              replace={replace}
              onClick={(e) => {
                hideDropdownContent();
                e.stopPropagation();
              }}
            >
              <span>
                <RiProfileLine aria-label="profile icon" />
              </span>
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <button
              className={`${styles.dropdownLink} ${styles.logoutButton}`}
              onClick={(e) => {
                resetAll();
                hideDropdownContent();
                e.stopPropagation();
              }}
            >
              <span>
                <IoIosLogOut aria-label="logout icon" />
              </span>
              <span>Log out</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );

  const navbar_without_user = (
    <nav className={styles.nav}>
      <NavLink
        className={({ isActive }) =>
          `${styles.navLink} ${isActive ? styles.navLinkIsActive : ""}`
        }
        to="/login"
        replace={replace}
      >
        Log in
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${styles.navLink} ${isActive ? styles.navLinkIsActive : ""}`
        }
        to="/register"
        replace={replace}
      >
        Register
      </NavLink>
    </nav>
  );

  return (
    <header className={styles.header}>
      <NavLink
        aria-label="link home"
        className={({ isActive }) =>
          `${isActive ? styles.linkToHomeIsActive : ""}`
        }
        to={"/"}
        replace={replace}
      >
        <GiSouthKorea
          aria-label="south korea icon"
          className={styles.southKoreaIcon}
        />
      </NavLink>
      {user ? navbar_with_user : navbar_without_user}
    </header>
  );
}
