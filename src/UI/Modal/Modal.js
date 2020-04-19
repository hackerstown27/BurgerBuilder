import React from "react";

import classes from "./modal.module.css";
import { withRouter } from "react-router-dom";
import Auxilary from "../../Hoc/Auxilary";
import Backdrop from "../Backdrop/Backdrop";
import Button from "../Button/Button";

class Modal extends React.Component {

    successBtnHandler = () => {
        this.props.history.push("/checkout");
    }

    render(){
        return (
        <Auxilary>
            <Backdrop  backdropHandler={this.props.backdropHandler} />
            <div className={classes.Modal}>
                <div>
                    <p>Confirm Your Order ?</p>
                    <p>Your Burger Following Ingridients:</p>
                    <ul>
                        {Object.keys(this.props.ingridients).map((ingridient) => {
                            return <li>{ingridient}: {this.props.ingridients[ingridient]}</li>
                        })}
                    </ul>
                    <p>Total Price: {this.props.totalPrice.toFixed(2)}</p>
                    <Button type="Danger" handler={this.props.backdropHandler}>Cancel</Button>
                    <Button type="Success" handler={this.successBtnHandler}>Procced</Button>
                </div>
            </div>
        </Auxilary>
    )
    }
    
}

export default withRouter(Modal);