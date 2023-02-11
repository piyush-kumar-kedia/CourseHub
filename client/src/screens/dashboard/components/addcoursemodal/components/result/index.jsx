import React from "react";
import "./styles.scss";
import formatLongText from "../../../../../../utils/formatLongText";
import { capitalise } from "../../../../../../utils/capitalise";
import { getRandomColor } from "../../../../../../utils/colors";

const Result = ({ _id, code, name, handleClick, handleModalClose }) => {
    return (
        <div
            className="result"
            onClick={() => {
                handleClick({
                    code: code.toUpperCase(),
                    name,
                });
                handleModalClose();
            }}
        >
            <span className="code">{code.toUpperCase()}</span>
            <span className="name">{capitalise(formatLongText(name, 40))}</span>
        </div>
    );
};

export default Result;
