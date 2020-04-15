import React from "react";

import classes from "./button.module.css";
import PropTypes from "prop-types";

const Button = (props) => {
    return (
        <button className={[classes.Button, classes[props.type]].join(" ")} disabled={props.disabled} onClick={props.handler}>{props.children}</button>
    )
}

Button.propTypes = {
    type: PropTypes.string,
    handler: PropTypes.func
}

export default Button;