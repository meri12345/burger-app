import React from 'react';
import Logo from '../../Logo/Logo.js'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer=(props)=>{
let addClass=[classes.SideDrawer,classes.Close];
if(props.open){
addClass=[classes.SideDrawer,classes.Open]
}

    return (
        <div >
            <Backdrop show={props.open} click={props.closed}/>
             <div className={addClass.join(' ')}>
            <Logo high="11%"/>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
        </div>
        
    );
};

export default sideDrawer;