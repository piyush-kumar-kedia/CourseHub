import "./styles.scss";
const SectionShare = (props) => {
    const offHandler = (event) => {
        if (event.target.id === "share") {
            const sectionShare = document.getElementById("share");
            sectionShare.classList.remove("show");
        }
    };
    return (
        <div className="section-share" id="share" onClick={offHandler}>
            {props.children}
        </div>
    );
};
export default SectionShare;
