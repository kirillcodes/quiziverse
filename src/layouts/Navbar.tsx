import scss from "@styles/layouts/Navbar.module.scss";
import { MdOutlinePersonOutline, MdOutlineSearch, MdAdd } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@assets/images/logo-universe.png";
import { useEffect, useState } from "react";
import { CustomButton, CustomInput, Modal } from "@components";
import { useCreateCourseMutation, useGetAllCoursesQuery } from "@store/api/coursesApi";

type Course = {
  id: number;
  title: string;
  username: string;
};

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

const filterCourses = (searchText: string, listOfCourses: Course[]): Course[] => {
  if (!searchText) {
    return listOfCourses;
  }

  const lowerSearchText = searchText.toLowerCase();

  return listOfCourses.filter(
    ({ title, id }) =>
      title.toLowerCase().includes(lowerSearchText) || id.toString().includes(lowerSearchText)
  );
};

export const Navbar = () => {
  const navigate = useNavigate();

  const [createCourseMutation] = useCreateCourseMutation();
  const { data: allCourses = [] } = useGetAllCoursesQuery({});

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const [inputSearch, setInputSearch] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);

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
    const Debounce = setTimeout(() => {
      const filteredCourses: Course[] = filterCourses(inputSearch, allCourses);
      inputSearch.trim().length ? setCourses(filteredCourses) : setCourses([]);
    }, 300);

    return () => clearTimeout(Debounce);
  }, [inputSearch, allCourses]);

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
        <input
          type="text"
          placeholder="Search course"
          value={inputSearch}
          onChange={(e) => handleInputSearch(e)}
        />
        <MdOutlineSearch className={scss.searchIcon} />
        <abbr title="Create course" onClick={toggleOpenModal}>
          <MdAdd className={scss.createCourse} />
        </abbr>
      </div>
      {inputSearch.trim() && courses.length && (
        <div className={scss.dropdownCoursesList}>
          <ul>
            {courses.map(({ id, title, username }) => (
              <li key={id} onClick={() => handleCourse(id)}>
                <div className={scss.courseInfo}>
                  <h4>{title}</h4>
                  <p>{username}</p>
                </div>
                <span>ID: {id}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
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
