import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component{
    state={
        ingredients:null,
        totalPrice:null
    }

    componentWillMount(){

        const query= new URLSearchParams(this.props.location.search);
        const ingredients={};
        let price =1;
            for (let param of query.entries()){
                if(param[0]==='price'){
                    price=param[1];
                }
                else{
                    ingredients[param[0]] = +param[1];

                }
            }
           this.setState({ingredients:ingredients,totalPrice:price}); 
        
    }

    continueHandler=()=>{
  
    this.props.history.replace('checkout/contact-data')
    }

    cancelHandler=()=>{
        this.props.history.goBack();
    }

    render(){
        return (
          <div>
              <CheckoutSummary click1={this.continueHandler}
              click2={this.cancelHandler}
              ingredients={this.state.ingredients}/>
              <Route path={this.props.match.path+'/contact-data'} render={(props)=><ContactData {...props} price={this.state.totalPrice} ingredients={this.state.ingredients}/>} />
          </div>
            
        );
    }
}

export default Checkout;