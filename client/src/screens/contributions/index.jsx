import Wrapper from "./components/wrapper";
import SectionC from "./components/sectionC";
import axios from "axios";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { useEffect, useRef, useState } from "react";
import "./styles.scss";
import { v4 as uuidv4 } from "uuid";
import { CreateNewContribution } from "../../api/Contribution";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import googleFormLink from "../../api/googleFormLink";
import { useDispatch } from "react-redux";

import { getCourse } from "../../api/Course";
import { UpdateCourses } from "../../actions/filebrowser_actions";
const Contributions = () => {
    const uploadedBy = useSelector((state) => state.user.user._id);
    const userName = useSelector((state) => state.user.user.name);
    const currentFolder = useSelector((state) => state.fileBrowser.currentFolder);
    const code = currentFolder?.course;
    const [contributionId, setContributionId] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        setContributionId(uuidv4());
    }, []);

    const [description, setDescription] = useState(null);
    const [submitEnabled, setSubmitEnabled] = useState(false);

    useEffect(() => {
        if (!description) {
            setSubmitEnabled(false);
            return;
        }
        setSubmitEnabled(true);
    }, [description]);

    // const [contributionId, setContributionId] = useState("");

    let pond = useRef();

    async function handleSubmit() {
        if (!description) {
            toast.error("Please fill the complete form.");
            return;
        }
        const collection = document.getElementsByClassName("contri");
        const contributionSection = collection[0];
        // console.log(toggle);
        // console.log(isAnoynmous);

        try {
            setSubmitEnabled(false);
            // console.log(resp);
            let resp = await CreateNewContribution({
                parentFolder: currentFolder._id,
                courseCode: currentFolder.course,
                description,
                approved: false,
                contributionId,
                uploadedBy,
            });
            // console.log(resp);
            await pond.current.processFiles();
            pond.current.removeFiles();
            contributionSection.classList.remove("show");
            toast.success("Files uploaded successfully!");
            setContributionId(uuidv4());
            setSubmitEnabled(true);
        } catch (error) {
            setSubmitEnabled(true);
            contributionSection.classList.remove("show");
            toast.error("Failed to upload! Please try again.");
            console.log(error);
        }

        //refresh the course in session storage to include the new file.
        try {
            let loadingCourseToastId = toast.loading("Loading course data...");
            const currCourse = await getCourse(code);
            const { data } = currCourse;
            if (!data.found) {
                toast.dismiss(loadingCourseToastId);
                toast.error("Course data not found!");
                return;
            }
            toast.dismiss(loadingCourseToastId);
            dispatch(UpdateCourses(data));
        } catch (error) {
            return null;
        }
        location.reload();
    }

    return (
        <SectionC>
            <Wrapper>
                <div className="head">Contribute to CourseHub</div>
                <form>
                    <div className="description">
                        <label htmlFor="description" className="label_description">
                            DESCRIPTION :
                        </label>
                        <textarea
                            name="description"
                            className="input_description"
                            placeholder="Give a brief description"
                            value={description ? description : ""}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                </form>
                <div className="file_pond">
                    <FilePond
                        name="file"
                        allowMultiple={true}
                        maxFiles={40}
                        server={{
                            url: "http://localhost:8080/api/contribution/upload",
                            process: {
                                headers: {
                                    "contribution-id": contributionId,
                                    username: userName,
                                },
                            },
                        }}
                        instantUpload={false}
                        ref={(ref) => {
                            pond.current = ref;
                        }}
                    />
                </div>
                <div className="uploaded">
                    {/* <span>UPLOADED:</span> folder/file */}
                    Or submit link on{" "}
                    <a href={googleFormLink} target="_blank">
                        Google forms.
                    </a>
                </div>
                <div className={`button ${submitEnabled}`} onClick={handleSubmit}>
                    SUBMIT
                </div>
            </Wrapper>
        </SectionC>
    );
};
export default Contributions;
