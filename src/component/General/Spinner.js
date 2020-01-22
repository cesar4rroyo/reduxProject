import React from "react";
import "../../css/Spinner.css";

const Spinner = props => (
    <div className="center">
        <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
);
export default Spinner;
