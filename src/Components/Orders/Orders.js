import React from "react";

import classes from "./orders.module.css";
import Spinner from "../../UI/Spinner/Spinner";
import axios from "../../axios-order";
import {connect} from "react-redux";

class Orders extends React.Component {

    state = {
        loading : true,
        orders: null
    }

    componentDidMount() {
        const queryParams = `?auth=${this.props.idToken}&orderBy="localId"&equalTo="${this.props.localId}"`;
        axios.get("/orders.json"+queryParams)
            .then(response => {
                this.setState({loading: false, orders: response.data});
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            this.state.loading ? <Spinner /> :
            <div className={classes.orders}>
                {
                    Object.keys(this.state.orders).map((id) => {
                        let order = this.state.orders[id];
                        let ingridients = order.ingridients;
                        let totalPrice = +order.totalPrice;
                        return (
                            <div key={id} className={classes.order}>
                                Ingridients : {Object.keys(ingridients).map(ingridient => {
                                    return <span key={ingridient}> {ingridient} ({ingridients[ingridient]}) </span>
                                })} 
                                <br/>
                                <br/>
                                Price : {totalPrice.toFixed(2)}
                            </div>
                        );
                    })
                }
            </div>
        )
    } 
}

const mapStateToProps = (state) => {
    return {
        idToken: state.auth.idToken,
        localId: state.auth.localId
    }
}

export default connect(mapStateToProps)(Orders);