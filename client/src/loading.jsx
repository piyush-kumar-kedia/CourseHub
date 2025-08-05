import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "./api/User";
import axios from "axios";
import { toast } from "react-toastify";
import "./loading.css";
import { LoginUser} from "./actions/user_actions";
import { useDispatch } from "react-redux";
//import { LoginUser } from "./redux/actions/authActions"; // adjust the path if needed
//import { UpdateUserMeta } from "./redux/actions/userMetaActions"; // optional, based on your setup

const LoadingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // ✅ Add dispatch hook
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
                // ✅ Fetch both sets of courses
                const [coursesRes, prevCoursesRes] = await Promise.all([
                    axios.post("http://localhost:8080/api/auth/fetchCourses", { rollNumber: user.rollNumber }),
                    user.isBR
                        ? axios.post("http://localhost:8080/api/auth/fetchCoursesForBr", { rollNumber: user.rollNumber })
                        : Promise.resolve({ data: { courses: [] } }),
                ]);

                user.courses = coursesRes.data.courses;
                user.previousCourses = prevCoursesRes.data.courses;
                console.log("after adding",user);
                // ✅ Save to sessionStorage (still helpful for page reloads)
                sessionStorage.setItem("user", JSON.stringify(user));
                sessionStorage.setItem("AllCourses", JSON.stringify(user.courses));

                // ✅ Dispatch to Redux
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
        <div className="loading">
        <div className="loader">
            <div className="justify-content-center jimu-primary-loading"></div>
        </div>
        <div className="text"><h2>Fetching your courses</h2></div>
        </div>

        
    );
};

export default LoadingPage;
