import formatLongText from "../../../../utils/formatLongText";
import { capitalise } from "../../../../utils/capitalise";
import "./styles.scss";
import { useEffect, useState } from "react";
import { IsCourseAvailable } from "../../../../api/Search";
import { DeleteCourseAPI } from "../../../../api/User";
import { toast } from "react-toastify";
const CourseCard = ({ code, color, name, type, setClicked }) => {
    const [isAvailable, setIsAvailable] = useState(true);
    useEffect(() => {
        async function SetCourseAvailability() {
            try {
                // const { data } = await IsCourseAvailable(code);
                setIsAvailable(true);
                // console.log(data.isAvailable);
            } catch (error) {
                // console.log(error);
                setIsAvailable(false);
            }
        }
        SetCourseAvailability();
    }, []);
    return type === "ADD" ? (
        <div className="coursecard ADD" onClick={setClicked}>
            <div className="content">
                <i className="fa fa-xl fa-plus" aria-hidden="true"></i>
                <p>Add Course</p>
            </div>
        </div>
    ) : (
        <div
            className={`coursecard ${isAvailable}`}
            style={{ backgroundColor: color }}
            // onClick={isAvailable ? setClicked : () => {}}
        >
            {/* <span
                className="remove-course"
                onClick={async () => {
                    try {
                        const resp = await DeleteCourseAPI(code);
                        location.reload();
                    } catch (error) {
                        toast.error("Something went wrong!");
                    }
                }}
            ></span> */}
            <div className="card-content" onClick={isAvailable ? setClicked : () => {}}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <p className="code">{code ? code : "code"}</p>
                    {!isAvailable && <p className="unavailable">UNAVAILABLE</p>}
                </div>
                <div className="name">
                    <p>{name ? formatLongText(capitalise(name), 39) : "name"}</p>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
