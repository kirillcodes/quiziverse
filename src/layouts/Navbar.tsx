import scss from "@styles/layouts/Navbar.module.scss";
import { MdOutlinePersonOutline, MdOutlineSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import Logo from "@assets/images/logo-universe.png";
import { useState } from "react";
import { logoutUser } from "@store/auth/actionCreators";
import { useAppDispatch } from "@hooks/useAppDispatch";

const dropdownMenu = [
  {
    title: "Courses",
    path: "/",
  },
  {
    title: "Profile",
    path: "/profile",
  },
  {
    title: "Logout",
    path: "",
  },
];

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const toggleOpenDropdown = () => {
    setIsOpenDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsOpenDropdown(false);
  };

  return (
    <nav className={scss.navbar}>
      <Link to="/" className={scss.logo}>
        <img src={Logo} alt="Quiziverse" />
        <h1>Quiziverse</h1>
      </Link>
      <div className={scss.search}>
        <input type="text" placeholder="Search course" />
        <MdOutlineSearch className={scss.searchIcon} />
      </div>
      <div className={scss.personal}>
        {/* <button>EN</button> */}
        <div className={scss.profile} onClick={toggleOpenDropdown}>
          <MdOutlinePersonOutline className={scss.profileIcon} />
        </div>
        <div
          className={scss.dropdown}
          style={isOpenDropdown ? { opacity: "1" } : { opacity: "0", pointerEvents: "none" }}
        >
          {dropdownMenu.map((item) => (
            <Link
              to={item.path}
              key={new Date().getTime() + item.path}
              onClick={item.title === "Logout" ? handleLogout : undefined}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
