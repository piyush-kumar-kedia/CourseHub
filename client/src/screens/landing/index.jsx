import MicrosoftSignIn from "./components/microsoftbutton";
import SearchCourseButton from "./components/searchcoursebtn";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { LoginUser, LogoutUser } from "../../actions/user_actions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUser, handleLogin } from "../../api/User";
import AddCourseModal from "./components/searchcoursemodal";
const LandingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        sessionStorage.removeItem("LocalCourses");
    }, []);

    const searchCourseShowModalHandler = (event) => {
        const collection = document.getElementsByClassName("add_modal");
        const contributionSection = collection[0];
        contributionSection.classList.add("show");
    };
    useEffect(() => {
        async function getAuth() {
            try {
                const { data } = await getUser();
                if (!data) {
                    dispatch(LogoutUser());
                    setLoading(false);
                    return;
                }
                dispatch(LoginUser(data));
                setLoading(false);
                navigate(`/dashboard`);
            } catch (error) {
                dispatch(LogoutUser());
                console.log(error.message);
                setLoading(false);
            }
        }
        getAuth();
    }, []);

    return loading ? (
        "loading..."
    ) : (
        <>
            <section className="landing">
                <div className="top">
                    <div className="right"></div>
                </div>
                <div className="bottom">
                    <div className="content">
                        <div className="text">
                            <p>
                                Your go-to platform for all your academic needs. Get access to past
                                papers, lecture slides, assignments, tutorials, notes and more to
                                help you ace your exams
                            </p>
                        </div>
                        <div className="btn-container">
                            <MicrosoftSignIn setClicked={handleLogin} />
                            {/* <div className="line"></div>
                            <SearchCourseButton
                                searchCourseShowModalHandler={searchCourseShowModalHandler}
                            /> */}
                        </div>
                    </div>
                </div>
            </section>
            <AddCourseModal />
        </>
    );
};

export default LandingPage;
