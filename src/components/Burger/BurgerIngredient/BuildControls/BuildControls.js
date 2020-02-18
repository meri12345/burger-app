import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label: 'Salad', type:'salad' },
    {label: 'Bacon', type:'bacon' },
    {label: 'Cheese', type:'cheese' },
    {label: 'Meat', type:'meat' }
];

const buildControls = (props) =>(
    <div className={classes.BuildControls}>
        {controls.map((el,i )=>(
            <BuildControl 
            disabled={props.disabled[el.type]}
            add={()=>props.add(el.type)} 
            remove={()=>props.remove(el.type)}
            key={el.label+i}
            label={el.label}/>
        ))}
    </div>
);

export default buildControls;