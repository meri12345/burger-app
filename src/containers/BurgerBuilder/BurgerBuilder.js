import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BurgerIngredient/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/BurgerIngredient/BuildControls/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner'
import errorHandler from '../../errorHandler/errorHandler'


class BurgerBuilder extends Component {
    state={
        canOrder: false,
        clickOrder: false,
        loading:false,
        error:null
    }
    componentDidMount(){
        // axios.get('https://burger-app-afb45.firebaseio.com/ingredients.json')
        // .then(response=>{
        //     this.setState({ingredinets:response.data});
        // })
        // .catch( err => {
        //     this.setState({error:true});
        // })
    }

    orderHandler=()=>{
        this.setState({clickOrder:true});
    }

    updateOrder =()=>{
        const copy={...this.props.ings};

        let sum=Object.keys(copy)
        .map(el =>{
            return copy[el];
        }).reduce((sum,el)=>{
           return sum+=el;
        },0);
       if(sum>0){
        return true;   
       }
       
        }
           

    cancelOrder = () =>{
        this.setState({clickOrder:false})
    }

    continueHandler = () =>{
   
    this.props.history.push(
        {pathname:'/checkout'
    });
    }

    render(){
        
       
        const disabledInfo={
            ...this.props.ings
        };
       
    
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }
       
        

    
let burger=this.state.error ? <p>Ingredients can't load</p>:<Spinner/>;
let orderSummary=null;

if(this.props.ings){
    burger=(
        <div><Burger ingredients={this.props.ings}/>
        <BuildControls 
        canOrder={this.updateOrder()}
        remove={this.props.removeIngredient} 
        add={this.props.addIngredient}
        disabled={disabledInfo}
        price={this.props.price}
        order={this.orderHandler}/> </div>);

        orderSummary=
        (<OrderSummary price={this.props.price} click={this.cancelOrder} continue={this.continueHandler} ingredients={this.props.ings}/>  );
}
if(this.state.loading){
    orderSummary=(<Spinner/>);
}
        
       return (
           <div>
               <Modal show={this.state.clickOrder} modalClosed={this.cancelOrder} >
                   {orderSummary}
               </Modal>
               {burger}
           </div>
       ); 
    }    
}
 
const mapStateToProps = state =>{
 return{
     ings:state.ingredients,
     price:state.totalPrice
 }
}

const mapDispatchtoProps = dispatch =>{
    return{
        addIngredient: (ingName)=>dispatch({type:actionTypes.ADD_INGREDIENT,name:ingName}),
        removeIngredient: (ingName)=>dispatch({type:actionTypes.REMOVE_INGREDIENT,name:ingName})
    }
}

export default connect(mapStateToProps,mapDispatchtoProps)(errorHandler(BurgerBuilder,axios));