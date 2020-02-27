import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label: 'Salad', type:'salad' },
    {label: 'Bacon', type:'bacon' },
    {label: 'Cheese', type:'cheese' },
    {label: 'Meat', type:'meat' }
];

const buildControls = (props) =>{
  
    return(
        <div className={classes.BuildControls}>
            <p>Current price= <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map((el,i )=>(
                <BuildControl 
                disabled={props.disabled[el.type]}
                add={()=>props.add(el.type)} 
                remove={()=>props.remove(el.type)}
                key={el.label+i}
                label={el.label}/>
            ))}
            <button disabled={!props.canOrder} className={classes.OrderButton} onClick={props.order}>ORDER NOW</button>
        </div>
    );
}


export default buildControls;