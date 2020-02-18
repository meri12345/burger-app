import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BurgerIngredient/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/BurgerIngredient/BuildControls/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon:1.7
}

class BurgerBuilder extends Component {
    state={
        ingredinets:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0,
            
        },
        totalPrice:4,
        canOrder: false,
        clickOrder: false
    }

    orderHandler=()=>{
        this.setState({clickOrder:true});
    }

    updateOrder =()=>{
        const copy={...this.state.ingredinets};

        let sum=Object.keys(copy)
        .map(el =>{
            return copy[el];
        }).reduce((sum,el)=>{
           return sum+=el;
        },0);
       sum+=1;
       if(sum>0){
           this.setState({canOrder:true});
       }

        }
        updateOrderR =()=>{
            const copy={...this.state.ingredinets};
    
            let sum=Object.keys(copy)
            .map(el =>{
                return copy[el];
            }).reduce((sum,el)=>{
               return sum+=el;
            },0);
            sum-=1;
            if(sum<=0){
           this.setState({canOrder:false});
       }
            }

    addIngredient = (type) => {
        const oldCount = this.state.ingredinets[type];
      
        const update =oldCount+1;
        const updatedIngredient = {
            ...this.state.ingredinets
        }
        updatedIngredient[type] = update;
 
        const priceAddition=INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        let newPrice=oldPrice+priceAddition;
        
        this.setState({
            ingredinets:updatedIngredient,
            totalPrice:newPrice
        });
        this.updateOrder();
   }

    removeIngredient = (type) => {
        const oldCount = this.state.ingredinets[type];
        if(oldCount<=0){
            return;
        }
        const update =oldCount-1;
      
        const updatedIngredient = {
            ...this.state.ingredinets
        }
        
        updatedIngredient[type] = update;
        const priceAddition=INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        let newPrice=oldPrice-priceAddition;
        this.setState({
            totalPrice:newPrice,
            ingredinets:updatedIngredient
        });
        this.updateOrderR();

    }

    cancelOrder = () =>{
        this.setState({clickOrder:false})
    }

    render(){
       
        const disabledInfo={
            ...this.state.ingredinets
        };
    
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }

       return (
           <div>
               <Modal show={this.state.clickOrder} modalClosed={this.cancelOrder} >
                   <OrderSummary ingredients={this.state.ingredinets}/>
               </Modal>
               <Burger ingredients={this.state.ingredinets}/>
               <BuildControls 
               canOrder={this.state.canOrder}
               remove={this.removeIngredient} 
               add={this.addIngredient}
               disabled={disabledInfo}
               price={this.state.totalPrice}
               order={this.orderHandler}/>
           </div>
       ); 
    }    
}

export default BurgerBuilder;