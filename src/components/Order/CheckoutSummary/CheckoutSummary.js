import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'

const checkoutSummary= (props) =>{
return (
    <div className={classes.checkoutSummary}>
        <h1>ENJOY!</h1>
        <div style={{width:'100%', margin:'auto'}}>
            <Burger ingredients={props.ingredients}/>
        </div>
        <div style={{width:'100%', margin:'auto'}}>
        <Button btnType='Danger'
        click={props.click2}>CANCEL</Button>
        <Button btnType='Success'
        click={props.click1}>CONTINUE</Button>
        </div>
    </div>
);
}

export default checkoutSummary;