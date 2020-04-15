import React from "react";

import classes from "./backdrop.module.css";


const Backdrop = (props) => {

    return (
        <div className={classes.Backdrop} onClick={props.backdropHandler}>
            {props.children}
        </div>
    );
}

export default Backdrop;