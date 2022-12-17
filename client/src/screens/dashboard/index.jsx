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

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const handleClick = (code) => {
        // dispatch(ChangeCurrentCourse(code));
        navigate("/browse");
    };

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
                    {user.myCourses.map((course) => (
                        <CourseCard
                            key={course.name}
                            code={course?.code?.toUpperCase()}
                            name={course.name}
                            color={course.color}
                            setClicked={() => handleClick(course.code)}
                        />
                    ))}
                    <CourseCard type={"ADD"} />
                </div>
                <Space amount={50} />
            </Container>
            <ContributionBanner />
            <Space amount={50} />
            <Container>
                <SubHeading text={"MY FAVOURITES"} type={"bold"} />
                <div className="fav-container">
                    {/* <FavouriteCard type={"folder"} color={""} />
                    <FavouriteCard
                        type={"file"}
                        color={""}
                        path={"Exams > Quiz 1"}
                        name={"Quiz 1 QP.pdf"}
                        subject={"Chemical Reaction Engineering"}
                    />
                    <FavouriteCard
                        type={"folder"}
                        color={"#EDF492"}
                        path={"Lecture Slides"}
                        name={"Premidsem"}
                        subject={"Green Chemistry"}
                    /> */}
                    {user?.favourites?.length > 0
                        ? user.favourites.map((favourite) => (
                              <FavouriteCard
                                  name={favourite.name}
                                  path={favourite.path}
                                  key={favourite.id}
                                  code={favourite.code}
                                  id={favourite.id}
                              />
                          ))
                        : "no favs"}
                </div>
            </Container>
            <Footer />
        </div>
    );
};

export default Dashboard;
