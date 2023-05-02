import { useState, useEffect } from "react";
import BrowseScreen from "./screens/browse";
import Dashboard from "./screens/dashboard";
import LandingPage from "./screens/landing";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./router_utils/PrivateRoutes";
import ProfilePage from "./screens/profile.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import ErrorScreen from "./screens/error";
import { useDispatch } from "react-redux";
import { LoadLocalCourses } from "./actions/user_actions";

const App = () => {
    const [initial, setInitial] = useState(true);
    const isLoggedIn = useSelector((state) => state.user.loggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!initial) return;
        try {
            const localCourses = window.sessionStorage.getItem("LocalCourses");
            if (!localCourses) return;
            dispatch(LoadLocalCourses(JSON.parse(localCourses)));
        } catch (error) {
            window.sessionStorage.removeItem("LocalCourses");
        }
    }, []);

    useEffect(() => {
        if (initial && isLoggedIn) {
            // toast.success("Logged In!");
            setInitial(false);
        }
    }, [isLoggedIn]);

    return window.screen.width >= 640 ? (
        <div className="App">
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme="light"
            />
            <Router>
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route element={<Dashboard />} path="dashboard" exact />
                        <Route element={<ProfilePage />} path="profile" exact />
                    </Route>
                    <Route element={<BrowseScreen />} path="browse">
                        <Route element={<BrowseScreen />} path=":code">
                            <Route element={<BrowseScreen />} path=":folderId" />
                        </Route>
                    </Route>
                    <Route element={<LandingPage />} path="/" />
                    <Route element={<ErrorScreen />} path="*" />
                </Routes>
            </Router>
        </div>
    ) : (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
            }}
        >
            <p
                style={{
                    fontSize: "1.5rem",
                    marginBottom: "16px",
                }}
            >
                Get CourseHub now!
            </p>
            <div>
                <a href="https://play.google.com/store/apps/details?id=com.codingclub.coursehub">
                    <img
                        src="google-play-badge.png"
                        alt=""
                        style={{
                            width: "180px",
                            height: "100%",
                        }}
                    />
                </a>
                <br />
                <a href="https://apps.apple.com/us/app/coursehub/id6447286863">
                    <img
                        src="app-store-badge.png"
                        alt=""
                        style={{
                            width: "159px",
                            height: "100%",
                        }}
                    />
                </a>
            </div>
        </div>
    );
};

export default App;
