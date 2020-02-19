import React from 'react'
import classes from './Toolbar.css'
import Logo from '../Logo/Logo'
import NavigationItems from '../Navigation/NavigationItems/NavigationItems'

const toolbar = () =>(
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <Logo high="80%"/>
        <nav className={classes.DesktopOnly}>
           <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;