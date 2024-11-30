import styles from "./sidebar.module.css";
import logo from "./../../assets/images/logo.png";
import { NavLink } from "react-router-dom";

const NAV_LIST = [
  {
    name: "DASHBOARD",
    path: "/",
    icon: "ri-function-line",
  },
  {
    name: "MY TASK",
    path: "/mytask",
    icon: "ri-menu-line",
  },
];
export const Sidebar = () => {
  return (
    <div className={styles.sideBar}>
      <div className={styles.contNav}>
        <div className={styles.contLogo}>dd</div>
        <ul className={styles.navList}>
          {NAV_LIST?.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? styles.activeLink : ""
                }
              >
                <i className={item.icon}></i>
                <div>{item.name}</div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
