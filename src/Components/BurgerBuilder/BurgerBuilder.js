import React from "react";

import Auxilary from "../../Hoc/Auxilary";
import BurgerIngredients from "./BurgerIngridients/BurgerIngridients";
import ControlPanel from "./ControlPanel/ControlPanel";
import Modal from "../../UI/Modal/Modal";
import Spinner from "../../UI/Spinner/Spinner";
import {connect} from "react-redux";
import * as actions from "../../store/actions/actions";


class BurgerBuilder extends React.Component{

    state = {
        modalState: false
    }

    modalToggler = () => {
        this.setState({modalState: true});
    }

    backdropHandler = () => {
        this.setState({modalState: false});
    }

    componentDidMount() {
        this.props.fetchIngridients();
    }
    
    render(){
        return (
            <Auxilary>  
                {this.state.modalState ? <Modal ingridients={this.props.ingredients} totalPrice={this.props.totalPrice} backdropHandler={this.backdropHandler}/> : null}
                {this.props.ingredients ? 
                <Auxilary> 
                    <BurgerIngredients ingridients={this.props.ingredients}/> 
                    <ControlPanel add={this.props.add} rem={this.props.rem} ingridients={this.props.ingredients} totalPrice={this.props.totalPrice} modalHandler={this.modalToggler}/> 
                </Auxilary>:
                <Spinner/>}
            </Auxilary>
        );
    }
}

const mapPropsFromState = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchFromState = (dispatch) => {
    return {
        fetchIngridients: () => dispatch(actions.asyncFetchIngridients()),
        add: (type) => dispatch(actions.add(type)),
        rem: (type) => dispatch(actions.rem(type)),
    }
}


export default connect(mapPropsFromState, mapDispatchFromState)(BurgerBuilder);