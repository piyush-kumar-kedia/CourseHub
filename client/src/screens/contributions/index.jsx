import Wrapper from "./components/wrapper";
import SectionC from "./components/sectionC";
import "./styles.scss";
const Contributions = () => {
    return (
        <SectionC>
            <Wrapper>
                <div className="head">Contribute to CourseHub</div>
                <form>
                    <div className="course">
                        <label htmlFor="course" className="label_course">
                            COURSE CODE :
                        </label>
                        <input
                            placeholder="Course Code"
                            name="course"
                            className="input_course"
                        ></input>
                    </div>
                    <div className="section">
                        <label htmlFor="section" className="label_section">
                            SECTION :
                        </label>
                        <select name="section" className="select_section">
                            <option value="Lecture Slides">Lecture Slides</option>
                            <option value="Tutorials">Tutorials</option>
                            <option value="Exams">Exams</option>
                            <option value="Notes">Notes</option>
                            <option value="Assignments">Assignments</option>
                        </select>
                    </div>
                    <div className="year">
                        <label htmlFor="year" className="label_year">
                            YEAR :
                        </label>
                        <select name="year" className="select_year">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                            </svg>

                            <option value="2022">2022</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                        </select>
                    </div>
                    <div className="description">
                        <label htmlFor="description" className="label_description">
                            DESCRIPTION :
                        </label>
                        <textarea
                            name="description"
                            className="input_description"
                            placeholder="Give a brief description"
                        ></textarea>
                    </div>
                </form>
                <div className="file">
                    <label for="file_upload" className="label_file">
                        <input type="file" id="file_upload" />
                        <img src="../../../public/upload.png" height="37px" width="37px" />
                        UPLOAD
                    </label>
                    <div className="uploaded">
                        <span>UPLOADED:</span> folder/file
                    </div>
                </div>

                <div className="button">SUBMIT</div>
            </Wrapper>
        </SectionC>
    );
};
export default Contributions;
