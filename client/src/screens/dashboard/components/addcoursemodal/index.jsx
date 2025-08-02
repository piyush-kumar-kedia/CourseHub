import Wrapper from "./components/wrapper";
import SectionC from "./components/sectionC";
import axios from "axios";

import "./styles.scss";
import Space from "../../../../components/space";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { GetSearchResult } from "../../../../api/Search";
import Result from "./components/result";
const AddCourseModal = ({ handleAddCourse }) => {
    const [code, setCode] = useState("");
    const [btnState, setBtnState] = useState("disabled");
    const [err, setErr] = useState(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user);
    const userCourses = user.user?.courses || [];

    useEffect(() => {
        if (code.length > 2) {
            if (btnState !== "") setBtnState("");
        } else {
            if (btnState !== "disabled") setBtnState("disabled");
        }
    }, [code]);

    async function handleSearch() {
        if (btnState === "disabled") return;
        // console.log("search");
        try {
            setLoading(true);
            setErr(null);
            let searchArr;
            if(/\d/.test(code)){    //if code contains number then pass it as one element array
                let codeWithoutSpace = code.replace(/\s+/g, "");
                searchArr= [codeWithoutSpace]
            }
            else{                  //if code does not contain number then split it and pass array of words
                searchArr= code.split(" ")
            }
            const { data } = await GetSearchResult(searchArr);
            if (data?.found === true) {
                setResults(data.results);
                setLoading(false);
                setErr(null);
            } else {
                setErr("No results found!");
                setLoading(false);
                setResults([]);
            }
            setCode("");
        } catch (error) {
            setCode("");
            setErr("Server Error! Please contact admin.");
        }
    }
    const handleModalClose = (event) => {
        const collection = document.getElementsByClassName("add_modal");
        const contributionSection = collection[0];
        contributionSection.classList.remove("show");
    };
    return (
        <SectionC>
            <Wrapper>
                <div className="head">Add new course</div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="course">
                        <label htmlFor="course" className="label_course">
                            COURSE CODE :
                        </label>
                        <input
                            placeholder="Course Code / Name"
                            name="course"
                            className="input_course"
                            onChange={(e) => {
                                setCode(e.target.value);
                                if (results.length > 0) setResults([]);
                            }}
                            value={code}
                        ></input>
                    </div>
                </form>
                {err === null
                    ? loading
                        ? "Loading courses..."
                        : results
                              .filter(
                                  (course) =>
                                      !userCourses.some(
                                          (userCourse) =>
                                              userCourse.code.toLowerCase() ===
                                              course.code.toLowerCase()
                                      )
                              )
                              .map((course) => (
                                  <Result
                                      key={course._id}
                                      _id={course._id}
                                      code={course.code}
                                      name={course.name}
                                      handleClick={handleAddCourse}
                                      handleModalClose={handleModalClose}
                                  />
                              ))
                    : err}
                <Space amount={35} />

                <div className={`button ${btnState}`} onClick={handleSearch}>
                    SEARCH CODE
                </div>
            </Wrapper>
        </SectionC>
    );
};
export default AddCourseModal;
