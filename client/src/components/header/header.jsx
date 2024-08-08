import styles from "./header.module.scss";
import { GiSouthKorea } from "react-icons/gi";
import { BiUser } from "react-icons/bi";
import { useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../../redux/api/users-api-slice";
import { clearCredentials } from "../../redux/features/auth/auth-slice";
import { resetTvseries } from "../../redux/features/tvseries/tvseries-slice";
import { apiSlice } from "../../redux/api/api-slice";
import toast from "react-hot-toast";

export default function Header() {
  const dropdownRef = useRef(null);
  const secondDropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [logoutUser, { isSuccess }] = useLogoutUserMutation();

  const showDropdownContent = () => {
    if (user && !dropdownRef?.current?.checked) {
      dropdownRef.current.checked = true;
    }
  };

  const hideDropdownContent = () => {
    if (user && dropdownRef?.current?.checked) {
      dropdownRef.current.checked = false;
    }
  };

  const handleClickOutsideDropdown = (e) => {
    if (
      user &&
      !secondDropdownRef?.current?.contains(e.target) &&
      !dropdownRef?.current?.checked
    ) {
      // console.log("I'm returning...");
      return;
    } else {
      // console.log(e.target);
      dropdownRef.current.checked = false;
    }
  };

  const handleLogoutUser = async () => {
    try {
      const res = await logoutUser().unwrap();
      toast.success(res.message);
      dispatch(clearCredentials());
      dispatch(resetTvseries());
      dispatch(apiSlice.util.resetApiState());
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [navigate, isSuccess]);

  useEffect(() => {
    window.addEventListener("click", handleClickOutsideDropdown, true);

    return () =>
      window.removeEventListener("click", handleClickOutsideDropdown, true);
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
        <BiUser className={styles.userIcon} />
        <ul className={styles.dropdownContent}>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${styles.dropdownLink} ${styles.linkToDashboard} ${
                  isActive ? styles.linkToDashboardIsActive : ""
                }`
              }
              to={"/dashboard"}
              onClick={(e) => {
                const linkIsActive = e.target.hasAttribute("aria-current");
                const ariaCurrentValue =
                  linkIsActive && e.target.getAttribute("aria-current");
                if (ariaCurrentValue === "page") {
                  return;
                } else {
                  hideDropdownContent();
                  e.stopPropagation();
                }
              }}
            >
              Dashboard
            </NavLink>
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
              Log out
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
      <Link to={"/"}>
        <GiSouthKorea className={styles.southKoreaIcon} />
      </Link>
      {user ? navbar_with_user : navbar_without_user}
    </header>
  );
}
