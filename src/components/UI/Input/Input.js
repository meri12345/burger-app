import React from 'react';
import classes from './Input.css'

const input = (props)=>{
    let element=null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.touched){
        inputClasses.push(classes.Invalid);
    }

    switch(props.elementType){
        case('input'):
        element=<input  onChange={props.change} className={inputClasses.join(' ')} value={props.value} {...props.elementConfig}/>;
        break;
        case('textarea'):
        element=<input  onChange={props.change} className={inputClasses.join(' ')} value={props.value} {...props.elementConfig}/>;
        break;
        case('select'):
        element=(
        <select 
            className={inputClasses.join(' ')} 
            value={props.value} onChange={props.change} >
                {props.elementConfig.options.map(option =>(
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
        </select>);
        break;
        default:
            element=<input  onChange={props.change} className={inputClasses.join(' ')} value={props.value} {...props.elementConfig}/>

    }

    return (
        <div className={classes.Input} >
            <label className={classes.Label} >{props.label}</label>
            {element}
        </div>
    );
}


export default input;