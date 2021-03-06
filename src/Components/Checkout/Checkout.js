import React from "react";

import classes from "./checkout.module.css";
import BurgerIngridients from "../BurgerBuilder/BurgerIngridients/BurgerIngridients";
import Button from "../../UI/Button/Button";
import axios from "../../axios-order";
import Spinner from "../../UI/Spinner/Spinner";
import Input from "../../UI/Input/Input";
import {connect} from "react-redux";

class Checkout extends React.Component {

    state = {
        loading: false,
        purchasable: false,
        orderFields : {
            customerName : {
                config :{
                    placeholder: "Customer Name",
                    type: "text"
                },
                value: "",
                validation: {
                    rules: {
                        required: true,
                        valid: false
                    }
                },
                hasTouched: false
            },
            street : {
                config :{
                    placeholder: "Street Address",
                    type: "text"
                },
                value: "",
                validation: {
                    rules: {
                        required: true,
                        valid: false
                    }
                },
                hasTouched: false
            },
            zip : {
                config :{
                    placeholder: "Zip Code",
                    type: "number"
                },
                value: "",
                validation: {
                    rules: {
                        required: true,
                        maxLen: 6,
                        minLen: 6,
                        valid: false
                    }
                },
                hasTouched: false
            },
            phone : {
                config :{
                    placeholder: "Phone No",
                    type: "number"
                },
                value: "",
                validation: {
                    rules: {
                        required: true,
                        maxLen: 10,
                        minLen: 10,
                        valid: false
                    }
                },
                hasTouched: false
            },
            deliveryMode : {
                config :{
                    type: "dropdown",
                    options : [ {value: "cheapest", "displayValue": "Cheapest"},
                                {value: "fastest", "displayValue": "Fastest"} ]
                },
                value: "cheapest",
                validation: {
                    rules: {
                        required: true,
                        valid: true
                    }
                },
                hasTouched: false
            }
        }
    }

    onConfirmHandler = () => {
        this.setState({loading: true});

        const orderDetails = {}
        Object.keys(this.state.orderFields).forEach((inputIdentifier) => {
            orderDetails[inputIdentifier] = this.state.orderFields[inputIdentifier].value;
        });

        axios.post("/orders.json?auth="+this.props.idToken, {
            ingridients: this.props.ingridients,
            orderDetails: orderDetails,
            totalPrice: this.props.totalPrice,
            localId: this.props.localId
        }).then(response => {
            this.setState({loading: true});
            this.props.history.push("/orders");
        }).catch(error => {
            console.log(error);
        });
    }

    onCancelhandler = () => {
        this.props.history.push("/");
    }

    onChangeHandler = (event, inputIdentifier) => {
        let updatedOrderFields = {...this.state.orderFields};
        let updatedValidation = {...updatedOrderFields[inputIdentifier].validation};

        let isValid = true;

        if(updatedValidation.rules.required){
            isValid = event.target.value.trim() !== "" && isValid;
        }

        if(updatedValidation.rules.minLen){
            isValid = event.target.value.length >= updatedValidation.rules.minLen && isValid;
        }

        if(updatedValidation.rules.maxLen){
             isValid = event.target.value.length <= updatedValidation.rules.maxLen && isValid;
        }

        updatedValidation.rules.valid = isValid;
        // console.log(updatedValidation.rules.valid)


        let isPurchasable = true;

        for (let inputElement in this.state.orderFields){
            isPurchasable = this.state.orderFields[inputElement].validation.rules.valid && isPurchasable;
        }

        updatedOrderFields[inputIdentifier] = {
            ...updatedOrderFields[inputIdentifier],
            value: event.target.value,
            hasTouched: true
        }
        this.setState({orderFields: updatedOrderFields, purchasable: isPurchasable});
    }

    render() {
        return (
            this.state.loading ? <Spinner />: 
            (<div className={classes.checkout}>
                <h1>Hope You Will like this Burger ...</h1>
                <p>Total Price: USD {this.props.totalPrice}</p>
                <BurgerIngridients ingridients={this.props.ingridients} />
                <form>
                    {Object.keys(this.state.orderFields).map(inputIdentifier => {
                        const inputElement = this.state.orderFields[inputIdentifier];
                        return <Input 
                                    key={inputIdentifier} 
                                    config={inputElement.config} 
                                    value={inputElement.value} 
                                    onChange={(event) => {this.onChangeHandler(event, inputIdentifier)}}
                                    isValid={inputElement.validation.rules.valid}
                                    hasTouched={inputElement.hasTouched}
                                    />
                    })}
                </form>
                <Button type="Danger" handler={this.onCancelhandler}> Cancel </Button>
                <Button type="Success" handler={this.onConfirmHandler} disabled={!this.state.purchasable}> Confirm </Button>
            </div>)
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingridients: state.order.ingredients,
        totalPrice: state.order.totalPrice,
        localId: state.auth.localId,
        idToken: state.auth.idToken
    }
}

export default connect(mapStateToProps)(Checkout);