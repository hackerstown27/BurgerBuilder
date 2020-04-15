import React from "react";

import classes from "../controlpanel.module.css";
import PropTypes from "prop-types";

const Control = (props) => {
    return (
        <div className={classes.BuildControl}>
            <span className={classes.Label}>{props.label}</span>
            <button className={classes.Less} onClick={() => {props.rem(props.type)}} disabled={props.isDisabled}>Less</button>
            <button className={classes.More} onClick={() => {props.add(props.type)}}>More</button>
        </div>
    );
}

Control.propTypes = {
    rem: PropTypes.func,
    add: PropTypes.func,
    label: PropTypes.string,
    type: PropTypes.string
}

export default Control;