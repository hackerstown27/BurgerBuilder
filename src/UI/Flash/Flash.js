import React from "react";

import classes from "./Flash.module.css";

const Flash = (props) => {
    return (
        <div className={classes.Flash}>
            {props.children}
        </div>
    )
}

export default Flash;