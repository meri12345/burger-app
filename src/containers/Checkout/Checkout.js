import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import ContactData from '../Checkout/ContactData/ContactData'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component{

    
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
              ingredients={this.props.ings}/>
              <Route path={this.props.match.path+'/contact-data'} 
              component={ContactData} />
          </div>
            
        );
    }
}
const mapStateToProps = state =>{
    return{
        ings:state.ingredients,
    }
   }
export default connect(mapStateToProps)(Checkout);