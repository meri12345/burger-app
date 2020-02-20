import React,{Component} from 'react';
import Button from '../../../../UI/Button/Button'

class OrderSummary extends Component{

render(){
    const ingredientSummary=Object.keys(this.props.ingredients)
.map(igKey =>{
return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
})

    return(<div>
    <h3>Your Order</h3>
    <p>Delicious hamburger with following ingredients:</p>
    <ul>
    {ingredientSummary}
    </ul>
<p><strong>Total proce: {this.props.price.toFixed(2)} $</strong></p>
    <p>Continue to checkout?</p>
    <Button click={this.props.click} btnType='Danger'>CANCEL</Button>
    <Button click={this.props.continue} btnType='Success'>CONTINUE</Button>
    </div>);  

}
  
};

export default OrderSummary;