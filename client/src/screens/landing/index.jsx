import MicrosoftSignIn from "./components/microsoftbutton";
import SearchCourseButton from "./components/searchcoursebtn";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { LoginUser, LogoutUser } from "../../actions/user_actions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUser, handleLogin } from "../../api/User";

const LandingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

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
        <section className="landing">
            <div className="top">
                <div className="right"></div>
            </div>
            <div className="bottom">
                <div className="content">
                    <div className="text">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa odio nibh
                            eu eu nulla ac vestibulum amet. Ultrices magna faucibus dui dignissim
                            scelerisque. Lorem a sed egestas libero nisi. Vel mauris non sed
                            fermentum.
                        </p>
                    </div>
                    <div className="btn-container">
                        <MicrosoftSignIn setClicked={handleLogin} />
                        <div className="line"></div>
                        <SearchCourseButton />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingPage;
