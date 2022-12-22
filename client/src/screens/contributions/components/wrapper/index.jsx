import "./styles.scss";
const Wrapper = (props) => {
    return (
        <div className="wrapper" id="wrapper">
            {props.children}
        </div>
    );
};
export default Wrapper;
