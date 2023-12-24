import scss from "@styles/layouts/Navbar.module.scss";
import { MdOutlinePersonOutline, MdOutlineSearch, MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import Logo from "@assets/images/logo-universe.png";
import { useState } from "react";
import { logoutUser } from "@store/auth/actionCreators";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { CustomButton, CustomInput, Modal } from "@components";

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
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [courseTitle, setCousreTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const toggleOpenDropdown = () => {
    setIsOpenDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsOpenDropdown(false);
  };

  const toggleOpenModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  const changeCourseTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCousreTitle(e.target.value);
  };

  const changeCourseDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseDescription(e.target.value);
  };

  const handleCreateCourse = () => {
    return null;
  };

  return (
    <nav className={scss.navbar}>
      {isOpenModal ? (
        <Modal handleModal={toggleOpenModal}>
          <h2>Create course</h2>
          <form>
            <label>Set a title of your course:</label>
            <CustomInput
              type="text"
              value={courseTitle}
              handleInput={changeCourseTitle}
              placeholder="Mathematics 2 year 1 semester"
              style={{ margin: "10px 0 20px 0" }}
            />
            <label>Set a description:</label>
            <CustomInput
              type="text"
              value={courseDescription}
              handleInput={changeCourseDescription}
              placeholder="This course is dedicated to the topic..."
              style={{ margin: "10px 0 20px 0" }}
            />
            <CustomButton title="Create" handleSubmit={handleCreateCourse} />
          </form>
        </Modal>
      ) : null}
      <Link to="/" className={scss.logo}>
        <img src={Logo} alt="Quiziverse" />
        <h1>Quiziverse</h1>
      </Link>
      <div className={scss.search}>
        <input type="text" placeholder="Search course" />
        <MdOutlineSearch className={scss.searchIcon} />
        <abbr title="Create course" onClick={toggleOpenModal}>
          <MdAdd className={scss.createCourse} />
        </abbr>
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
