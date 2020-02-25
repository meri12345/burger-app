import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BurgerIngredient/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/BurgerIngredient/BuildControls/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner'
import errorHandler from '../../errorHandler/errorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon:1.7
}

class BurgerBuilder extends Component {
    state={
        ingredinets:null,
        totalPrice:4,
        canOrder: false,
        clickOrder: false,
        loading:false,
        error:null
    }
    componentDidMount(){
        axios.get('https://burger-app-afb45.firebaseio.com/ingredients.json')
        .then(response=>{
            this.setState({ingredinets:response.data});
        })
        .catch( err => {
            this.setState({error:true});
        })
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

    continueHandler = () =>{
   
    const queryParams=[];
    for(let i in this.state.ingredinets){
        queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredinets[i]));
    }
    queryParams.push('price='+this.state.totalPrice);
    const queryString=queryParams.join('&');

    this.props.history.push(
        {pathname:'/checkout',
        search:'?'+ queryString
    });
    }

    render(){
       
        const disabledInfo={
            ...this.state.ingredinets
        };
    
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }
       

    
let burger=this.state.error ? <p>Ingredients can't load</p>:<Spinner/>;
let orderSummary=null;

if(this.state.ingredinets){
    burger=(
        <div><Burger ingredients={this.state.ingredinets}/>
        <BuildControls 
        canOrder={this.state.canOrder}
        remove={this.removeIngredient} 
        add={this.addIngredient}
        disabled={disabledInfo}
        price={this.state.totalPrice}
        order={this.orderHandler}/> </div>);

        orderSummary=
        (<OrderSummary price={this.state.totalPrice} click={this.cancelOrder} continue={this.continueHandler} ingredients={this.state.ingredinets}/>  );
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

export default errorHandler(BurgerBuilder,axios);