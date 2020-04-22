import React, {Component} from "react";

import Input from "../../UI/Input/Input";
import classes from "./Auth.module.css";
import Button from "../../UI/Button/Button";
import {connect} from "react-redux";
import * as actions from "../../store/actions/auth";
import Flash from "../../UI/Flash/Flash";
import {Redirect} from "react-router-dom"

class Auth extends Component {

    state = {
        isSignUp: true,
        authFields : {
            email : {
                config :{
                    placeholder: "Email",
                    type: "email"
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
            password : {
                config :{
                    placeholder: "Password",
                    type: "password"
                },
                value: "",
                validation: {
                    rules: {
                        required: true,
                        valid: false,
                        minLen: 6
                    }
                },
                hasTouched: false
            }
        } 
    }

    onChangeHandler = (event, inputIdentifier) => {
        let updatedAuthFields = {...this.state.authFields};
        let updatedValidation = {...updatedAuthFields[inputIdentifier].validation};

        let isValid = true;

        if(updatedValidation.rules.required){
            isValid = event.target.value.trim() !== "" && isValid;
        }

        if(updatedValidation.rules.minLen){
            isValid = event.target.value.length >= updatedValidation.rules.minLen && isValid;
        }

        updatedValidation.rules.valid = isValid;

        updatedAuthFields[inputIdentifier] = {
            ...updatedAuthFields[inputIdentifier],
            value: event.target.value,
            hasTouched: true
        }
        this.setState({authFields: updatedAuthFields});
    }

    onAuthHandler = (event) => {
        event.preventDefault();
        this.props.onAuthStart(this.state.authFields.email.value, this.state.authFields.password.value, this.state.isSignUp);
    }

    onAuthSwitchHandler = (event) => {
        event.preventDefault();
        this.setState((prevState) => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    render(){
        let error = null;

        if(this.props.error){   
            error = <Flash>{this.props.error}</Flash> 
        }

        return (
            <div>
                {error}
                {this.props.idToken === null ? null: <Redirect to="/" />}
                <form className={classes.AuthForm}>
                    {Object.keys(this.state.authFields).map(inputIdentifier => {
                            const inputElement = this.state.authFields[inputIdentifier];
                            return <Input 
                                        key={inputIdentifier} 
                                        config={inputElement.config} 
                                        value={inputElement.value} 
                                        onChange={(event) => {this.onChangeHandler(event, inputIdentifier)}}
                                        isValid={inputElement.validation.rules.valid}
                                        hasTouched={inputElement.hasTouched}
                                    />
                    })}
                    <Button type="Success" handler={this.onAuthHandler}> {this.state.isSignUp ? "Sign Up" :"Sign In"} </Button>
                    <Button type="Danger" handler={this.onAuthSwitchHandler}> Switch To {this.state.isSignUp ? "Sign In" : "Sign Up"} </Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.auth  
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthStart:(email, password, isSignUp) => {dispatch(actions.asycAuthStart(email, password, isSignUp))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);