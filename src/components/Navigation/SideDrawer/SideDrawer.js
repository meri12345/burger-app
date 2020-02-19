import React from 'react';
import Logo from '../../Logo/Logo.js'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer=(props)=>{


    return (
        <div >
            <Backdrop />
             <div className={classes.SideDrawer}>
            <Logo high="11%"/>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
        </div>
        
    );
};

export default sideDrawer;