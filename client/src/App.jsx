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

const App = () => {
    const [initial, setInitial] = useState(true);
    const isLoggedIn = useSelector((state) => state.user.loggedIn);

    useEffect(() => {
        if (initial && isLoggedIn) {
            toast.success("Logged In!");
            setInitial(false);
        }
    }, [isLoggedIn]);

    return (
        <div className="App">
            <ToastContainer
                position="top-right"
                autoClose={750}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme="light"
            />
            <Router>
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route element={<BrowseScreen />} path="/browse" exact />
                        <Route element={<Dashboard />} path="/dashboard" exact />
                        <Route element={<ProfilePage />} path="/profile" exact />
                    </Route>
                    <Route element={<LandingPage />} path="/" />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
