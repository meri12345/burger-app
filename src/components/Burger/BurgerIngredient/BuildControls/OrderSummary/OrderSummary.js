import React from 'react'
import Aux from '../../../../../components/Aux'

const orderSummary = (props) =>{

const ingredientSummary=Object.keys(props.ingredients)
.map(igKey =>{
return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
})

return(<Aux>
    <h3>Your Order</h3>
    <p>Delicious hamburger with following ingredients:</p>
    <ul>
    {ingredientSummary}
    </ul>
    <p>Continue</p>
    </Aux>);    
};

export default orderSummary;