import React from 'react';
import classes from './Order.css'

const order=(props)=>{

   const ing=[];
    for(let ingredientName in props.ingredients){
        ing.push({amount:props.ingredients[ingredientName],
        name:ingredientName})
    };
    
    const output=ing.map(el=>{
        return(   
        <span style={{
            textTransform:'capitalize',
            display:'inline-block',
            margin:'0 8px',
            border:'1px solid #ccc',
            padding:'5px'

        }} key={el.name}>{el.name} : ({el.amount}) </span>
            );
    }
  );

    return( <div className={classes.Order}>
   <p>Ingredients: {output}</p>   
    <p>Price: <strong>{props.price.toFixed(2)} $</strong></p>
    </div>);
}
   


export default order; 