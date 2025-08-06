import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "./api/User";
import { fetchUserCoursesData } from "./api/Course";
import { toast } from "react-toastify";
import { LoginUser } from "./actions/user_actions";
import { useDispatch } from "react-redux";

const LoadingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadData() {
            try {
                const { data: user } = await getUser();
                if (!user || !user.rollNumber) {
                    setError("Invalid user data.");
                    return navigate("/login");
                }
                console.log("here in loading");
                const { courses, previousCourses } = await fetchUserCoursesData(user);

                user.courses = courses;
                user.previousCourses = previousCourses;
                console.log("after adding", user);
                sessionStorage.setItem("user", JSON.stringify(user));
                sessionStorage.setItem("AllCourses", JSON.stringify(user.courses));
                dispatch(LoginUser(user));

                navigate("/dashboard");
            } catch (err) {
                console.error("Loading error:", err);
                toast.error("Failed to load user data.");
                setError("Failed to load user data.");
                navigate("/login");
            }
        }

        loadData();
    }, [dispatch, navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-black text-white">
            <div className="flex justify-center items-center relative">
                <div className="jimu-primary-loading"></div>
            </div>
            <div className="mt-10 text-center">
                <h2>Fetching your courses</h2>
            </div>

            {/* Custom CSS for the loader animation */}
            <style jsx>{`
                .jimu-primary-loading:before,
                .jimu-primary-loading:after {
                    position: absolute;
                    top: 0;
                    content: "";
                }

                .jimu-primary-loading:before {
                    left: -19.992px;
                }

                .jimu-primary-loading:after {
                    left: 19.992px;
                    -webkit-animation-delay: 0.32s !important;
                    animation-delay: 0.32s !important;
                }

                .jimu-primary-loading:before,
                .jimu-primary-loading:after,
                .jimu-primary-loading {
                    background: #ffffff;
                    -webkit-animation: loading-keys-app-loading 0.8s infinite ease-in-out;
                    animation: loading-keys-app-loading 0.8s infinite ease-in-out;
                    width: 13.6px;
                    height: 32px;
                }

                .jimu-primary-loading {
                    text-indent: -9999em;
                    margin: auto;
                    position: relative;
                    right: 0;
                    top: 0;
                    -webkit-animation-delay: 0.16s !important;
                    animation-delay: 0.16s !important;
                }

                @-webkit-keyframes loading-keys-app-loading {
                    0%,
                    80%,
                    100% {
                        opacity: 0.75;
                        box-shadow: 0 0 #3a3a3a;
                        height: 32px;
                    }
                    40% {
                        opacity: 1;
                        box-shadow: 0 -8px #9e9e9e;
                        height: 40px;
                    }
                }

                @keyframes loading-keys-app-loading {
                    0%,
                    80%,
                    100% {
                        opacity: 0.75;
                        box-shadow: 0 0 #c4c4c5;
                        height: 32px;
                    }
                    40% {
                        opacity: 1;
                        box-shadow: 0 -8px #717171;
                        height: 40px;
                    }
                }
            `}</style>
        </div>
    );
};

export default LoadingPage;
