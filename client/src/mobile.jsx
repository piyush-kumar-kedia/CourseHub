import "./mobile.css";

const MobilePage = () => {
    return (
        <div className="box">
        <div className="message">
                <img
                    src="https://img.icons8.com/fluency/96/000000/laptop.png"
                    alt="Laptop"
                    class="laptop-img"
                />
                <h1>CourseHub is only accessible through PC/Laptop</h1>
                <p>
                    We currently do not support mobile access. Please visit this site from a desktop
                    or laptop device.
                </p>
            </div>
        </div>
    );
};

export default MobilePage;
