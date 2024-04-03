import scss from "@styles/layouts/Navbar.module.scss";
import { MdOutlinePersonOutline, MdOutlineSearch, MdAdd } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@assets/images/logo-universe.png";
import { useEffect, useState } from "react";
import { CustomButton, CustomInput, Modal } from "@components";
import { useCreateCourseMutation, useSearchCoursesMutation } from "@store/api/coursesApi";
import { useGetRoleQuery } from "@store/api/authApi";

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
    path: "/auth",
  },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const [createCourseMutation] = useCreateCourseMutation();
  const [searchCourses, { data: courses }] = useSearchCoursesMutation();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const { data: roleData } = useGetRoleQuery({});

  const toggleOpenDropdown = () => {
    setIsOpenDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsOpenDropdown(false);
  };

  const toggleOpenModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  const changeCourseTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseTitle(e.target.value);
  };

  const changeCourseDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseDescription(e.target.value);
  };

  const handleCreateCourse = async (): Promise<void> => {
    if (courseTitle.trim() && courseDescription.trim()) {
      const [title, description] = [courseTitle, courseDescription];
      await createCourseMutation({ title, description });
    }
  };

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  const handleCourse = (id: number) => {
    navigate(`/course/${id}`);
    setInputSearch("");
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      searchCourses(inputSearch);
    }, 500);

    return () => clearTimeout(debounce);
  }, [inputSearch, searchCourses]);

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
              placeholder="Software Engineering"
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
        <input
          type="text"
          placeholder="Search course"
          value={inputSearch}
          onChange={(e) => handleInputSearch(e)}
        />
        <MdOutlineSearch className={scss.searchIcon} />
        {roleData && roleData.role === "TEACHER" ? (
          <abbr title="Create course" onClick={toggleOpenModal}>
            <MdAdd className={scss.createCourse} />
          </abbr>
        ) : null}
      </div>
      {inputSearch.trim() && courses && courses.length > 0 && (
        <div className={scss.dropdownCoursesList}>
          <ul>
            {courses.map(({ id, title, author }) => (
              <li key={id} onClick={() => handleCourse(id)}>
                <div className={scss.courseInfo}>
                  <h4>{title}</h4>
                  <p>{author}</p>
                </div>
                <span>ID: {id}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={scss.personal}>
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
