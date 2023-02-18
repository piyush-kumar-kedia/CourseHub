import React from "react";
import "./styles.scss";

const ToggleSwitch = ({ label }) => {
    return (
        <section className="t-container">
            <section className="toggle-switch">
                <input type="checkbox" className="checkbox" name={label} id={label} />
                <label className="label" htmlFor={label}>
                    <span className="inner" />
                    <span className="switch" />
                </label>
            </section>
        </section>
    );
};

export default ToggleSwitch;
