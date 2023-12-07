import scss from "@styles/layouts/Navbar.module.scss";
import { MdOutlinePersonOutline, MdOutlineSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo-universe.png";

export const Navbar = () => {
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
        <button>EN</button>
        <div className={scss.profile}>
          <MdOutlinePersonOutline className={scss.profileIcon} />
        </div>
      </div>
    </nav>
  );
};
