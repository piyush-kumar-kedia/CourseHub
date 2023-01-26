import "./styles.scss";
import Container from "../../components/container";
import ExamCard from "./components/examcard";
import Heading from "../../components/heading";
import Space from "../../components/space";
import NavBar from "../../components/navbar";
import SubHeading from "../../components/subheading";
import CourseCard from "./components/coursecard";
import ContributionBanner from "./components/contributionbanner";
import Footer from "../../components/footer";
import FavouriteCard from "./components/favouritecard";

import { ChangeCurrentCourse, ResetFileBrowserState } from "../../actions/filebrowser_actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import formatName from "../../utils/formatName";
import formatBranch from "../../utils/formatBranch";
import { useEffect } from "react";
import { getColors } from "../../utils/colors";
import { LoadCourses } from "../../actions/filebrowser_actions";
import Contributions from "../contributions";
import { AddNewCourseLocal } from "../../actions/user_actions";
import AddCourseModal from "./components/addcoursemodal";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const contributionHandler = (event) => {
        const collection = document.getElementsByClassName("contri");
        const contributionSection = collection[0];
        contributionSection.classList.add("show");
    };
    const addCourseModalShowHandler = (event) => {
        const collection = document.getElementsByClassName("add_modal");
        const contributionSection = collection[0];
        contributionSection.classList.add("show");
    };
    const handleAddCourse = ({ _id, name, code, color }) => {
        dispatch(
            AddNewCourseLocal({
                _id,
                name,
                code,
                color,
            })
        );
    };

    useEffect(() => {
        if (localStorage.getItem("AllCourses") !== null) {
            try {
                dispatch(LoadCourses(JSON.parse(localStorage.getItem("AllCourses"))));
            } catch (error) {
                dispatch(LoadCourses([]));
                console.log("load error");
            }
        }
    }, []);

    const handleClick = (code) => {
        dispatch(ChangeCurrentCourse(null, code.toUpperCase()));
        navigate("/browse");
    };
    console.log(user);

    useEffect(() => {
        dispatch(ResetFileBrowserState());
    }, []);

    return (
        <div className="App">
            <NavBar />
            <Container color={"dark"}>
                <Space amount={20} />
                <div className="split">
                    <div>
                        <Heading text={"Welcome,"} type={""} color={"light"} />
                        <Heading
                            text={formatName(user?.user?.name)}
                            type={"bold"}
                            color={"light"}
                        />
                        <SubHeading
                            text={formatBranch(user?.user?.degree, user?.user?.department)}
                            color={"light"}
                        />
                    </div>

                    <div className="exam-card-container">
                        <ExamCard days={22} name={"Mid-Sem Exam"} color={"#FECF6F"} />
                        <ExamCard days={45} name={"End-Sem Exam"} color={"#FECF6F"} />
                    </div>
                </div>
                <Space amount={50} />
                <SubHeading text={"MY COURSES"} color={"light"} type={"bold"} />
                <Space amount={20} />
                <div className="coursecard-container">
                    {user.user.courses.map((course, index) => (
                        <CourseCard
                            key={course.name}
                            code={course?.code?.toUpperCase()}
                            name={course.name}
                            color={getColors(index)}
                            setClicked={() => handleClick(course.code)}
                        />
                    ))}
                    {user.localCourses.map((course) => (
                        <CourseCard
                            key={course.name}
                            code={course?.code?.toUpperCase()}
                            name={course.name}
                            color={course.color}
                            setClicked={() => handleClick(course.code)}
                        />
                    ))}

                    <CourseCard
                        type={"ADD"}
                        setClicked={() => {
                            // dispatch(
                            //     AddNewCourseLocal({
                            //         _id: "638f1709897b3c84b7d8d32c",
                            //         name: "Introduction to Engineering Drawing",
                            //         code: "ce101",
                            //         color: "#DBCEFF",
                            //     })
                            // );
                            // console.log(user);
                            addCourseModalShowHandler();
                        }}
                    />
                </div>
                <Space amount={50} />
            </Container>
            <ContributionBanner contributionHandler={contributionHandler} />
            <Space amount={50} />
            <Container>
                <SubHeading text={"MY FAVOURITES"} type={"bold"} />
                <div className="fav-container">
                    {user?.favourites?.length > 0
                        ? user.favourites.map((favourite) => (
                              <FavouriteCard
                                  name={favourite.name}
                                  path={favourite.path}
                                  key={favourite.id}
                                  code={favourite.code}
                                  id={favourite.id}
                                  _id={favourite._id}
                              />
                          ))
                        : "No favourites added yet."}
                </div>
            </Container>
            <Footer />
            <Contributions />
            <AddCourseModal handleAddCourse={handleAddCourse} />
        </div>
    );
};

export default Dashboard;
