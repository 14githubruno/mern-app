import styles from "./header.module.scss";
import { GiSouthKorea } from "react-icons/gi";
import { BiUser } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { RiProfileLine } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "../../redux/api/users-api-slice";
import { useResetApiAndUser } from "../../hooks/use-reset-api-and-user";
import toast from "react-hot-toast";

export default function Header() {
  const dropdownRef = useRef(null);
  const secondDropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const resetAll = useResetApiAndUser();
  const [logoutUser, { isSuccess }] = useLogoutUserMutation();

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

  const handleLogoutUser = async () => {
    try {
      const res = await logoutUser().unwrap();
      toast.success(res.message);
      resetAll();
    } catch (err) {
      if (err.data.type === "token") {
        toast.error("Token has expired. Log in again");
        resetAll();
        return;
      }
      toast.error(err.data.message);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [navigate, isSuccess]);

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
        ref={secondDropdownRef}
        onClick={showDropdownContent}
        className={styles.userIconDropdownWrapper}
      >
        <BiUser aria-label="user icon" className={styles.userIcon} />
        <ul className={styles.dropdownContent}>
          <li>
            <Link
              className={`${styles.dropdownLink} ${styles.linkToDashboard} ${
                location.pathname === "/dashboard"
                  ? styles.linkToDashboardIsActive
                  : ""
              }`}
              to={"/dashboard"}
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
                handleLogoutUser();
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
          `${styles.navLink}  ${isActive ? styles.navLinkIsActive : ""}`
        }
        to="/login"
      >
        Log in
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${styles.navLink}  ${isActive ? styles.navLinkIsActive : ""}`
        }
        to="/register"
      >
        Register
      </NavLink>
    </nav>
  );

  return (
    <header className={styles.header}>
      <NavLink
        className={({ isActive }) =>
          `${isActive ? styles.linkToHomeIsActive : ""}`
        }
        to={"/"}
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
