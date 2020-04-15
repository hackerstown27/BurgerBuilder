import React from "react";

import classes from "./input.module.css";

const Input = (props) => {
    let inputElement = null;

    let inputClasses = [classes.Input];

    if(!props.isValid && props.hasTouched){
        inputClasses.push(classes.Invalid);
    }

    inputClasses = inputClasses.join(" ");

    switch(props.config.type){
        case "text":
            inputElement = <input className={inputClasses} {...props.config} value={props.value} onChange={props.onChange}/>;
            break;
        case "text":
            inputElement = <input className={inputClasses} {...props.config} value={props.value} onChange={props.onChange}/>;
            break;
        case "number":
            inputElement = <input className={inputClasses} {...props.config} value={props.value} onChange={props.onChange}/>;
            break;
        case "email":
            inputElement = <input className={inputClasses} {...props.config} value={props.value} onChange={props.onChange}/>;
            break;
        case "dropdown":
            inputElement = 
                <select className={inputClasses} {...props.config} value={props.value} onChange={props.onChange}>
                    {props.config.options.map(option => {
                        return <option value={option.value}>{option.displayValue}</option>
                    })}
                </select>;
            break;
    }

    return inputElement;
}

export default Input;