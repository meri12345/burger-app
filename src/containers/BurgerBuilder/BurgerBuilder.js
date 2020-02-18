import React, {Component} from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BurgerIngredient/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meet: 1.3,
    bacon:1.7
}

class BurgerBuilder extends Component {
    state={
        ingredinets:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:1,
            
        },
        totalPrice:4
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
            totalPrice:newPrice,
            ingredinets:updatedIngredient
        })
        
       

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
        })
        
    }

    render(){

        const disabledInfo={
            ...this.state.ingredinets
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }
        console.log(disabledInfo);

       return (
           <div>
               <Burger ingredients={this.state.ingredinets}/>
               <BuildControls 
               remove={this.removeIngredient} 
               add={this.addIngredient}
               disabled={disabledInfo}/>
           </div>
       ); 
    }    
}

export default BurgerBuilder;