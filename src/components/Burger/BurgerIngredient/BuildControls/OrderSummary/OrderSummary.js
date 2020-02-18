import React from 'react';
import Button from '../../../../UI/Button/Button'

const orderSummary = (props) =>{

const ingredientSummary=Object.keys(props.ingredients)
.map(igKey =>{
return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
})

return(<div>
    <h3>Your Order</h3>
    <p>Delicious hamburger with following ingredients:</p>
    <ul>
    {ingredientSummary}
    </ul>
    <p>Continue to checkout?</p>
    <Button click={props.click} btnType='Danger'>CANCEL</Button>
    <Button click={props.continue} btnType='Success'>CONTINUE</Button>
    </div>);    
};

export default orderSummary;