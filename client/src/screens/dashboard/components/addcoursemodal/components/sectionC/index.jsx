import "./styles.scss";
const SectionC = (props) => {
    const offHandler = (event) => {
        if (event.target.id === "add_modal") {
            const collection = document.getElementsByClassName("add_modal");
            const contributionSection = collection[0];
            contributionSection.classList.remove("show");
        }
    };
    return (
        <div className="add_modal" id="add_modal" onClick={offHandler}>
            {props.children}
        </div>
    );
};
export default SectionC;
