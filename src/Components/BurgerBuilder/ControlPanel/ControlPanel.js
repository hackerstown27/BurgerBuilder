import React from "react";

import Auxilary from "../../../Hoc/Auxilary";
import Control from "./Control/Control";
import classes from "./controlpanel.module.css";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom"


const ControlPanel = (props) => {

    const controls = [
        {type: "salad", label: "Salad"},
        {type: "bacon", label: "Bacon"},
        {type: "cheese", label: "Cheese"},
        {type: "meat", label: "Meat"}
    ];

    const ingQuantity = Object.keys(props.ingridients).map((igKey) => {
        return props.ingridients[igKey]
    })
    .reduce((initVal, nextVal) => {
        return initVal + nextVal;
    }, 0);

    

    return (
        <Auxilary>
            <div className={classes.controlPanel}>
                <h2 className={classes.priceLabel}>Total Price: {props.totalPrice.toFixed(2)}</h2>
                {
                    controls.map((control) => {
                        return <Control 
                                    label={control.label} 
                                    type={control.type} 
                                    add={props.add} 
                                    rem={props.rem}
                                    isDisabled={props.ingridients[control.type] <=0}
                                />
                    })
                }
                <button
                    className={classes.OrderButton} 
                    disabled={ingQuantity <= 0 && props.isLogin} 
                    onClick={props.isLogin ? props.modalHandler : () => {props.history.push("/auth")} }>
                    {props.isLogin ? "ORDER NOW" : "Sign Up To Order Now !"}
                </button>
            </div>
        </Auxilary>
    );
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.auth.idToken !== null
    }
}

export default withRouter(connect(mapStateToProps)(ControlPanel));