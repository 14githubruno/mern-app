import styles from "./header.module.scss";
import { GiSouthKorea } from "react-icons/gi";
import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../../redux/api/users-api-slice";
import { clearCredentials } from "../../redux/features/auth/auth-slice";
import { apiSlice } from "../../redux/api/api-slice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [logoutUser, { isSuccess }] = useLogoutUserMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [navigate, isSuccess]);

  const handleLogoutUser = async () => {
    try {
      const res = await logoutUser().unwrap();
      console.log(res);
      dispatch(clearCredentials());
      dispatch(apiSlice.util.resetApiState());
    } catch (err) {
      console.log(err);
    }
  };

  const navbar_with_user = (
    <nav className={styles.nav}>
      <NavLink
        className={({ isActive }) =>
          `${styles.navLink} ${styles.navLinksAndButtons} ${
            isActive ? styles.navLinkIsActive : ""
          }`
        }
        to={"/dashboard"}
      >
        Dashboard
      </NavLink>
      <button
        className={`${styles.navLinksAndButtons} ${styles.logoutButton}`}
        onClick={handleLogoutUser}
      >
        log out
      </button>
    </nav>
  );

  const navbar_without_user = (
    <nav className={styles.nav}>
      <NavLink
        className={({ isActive }) =>
          `${styles.navLink} ${styles.navLinksAndButtons} ${
            isActive ? styles.navLinkIsActive : ""
          }`
        }
        to="/login"
      >
        Log in
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${styles.navLink} ${styles.navLinksAndButtons} ${
            isActive ? styles.navLinkIsActive : ""
          }`
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
