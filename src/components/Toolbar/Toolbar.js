import React from 'react'
import classes from './Toolbar.css'
import DrawerToggle from '../Navigation/SideDrawer/DrawerToggle/DrawerToggle' 
import Logo from '../Logo/Logo'
import NavigationItems from '../Navigation/NavigationItems/NavigationItems'

const toolbar = (props) =>(
    <header className={classes.Toolbar}>
        <DrawerToggle click={props.click}/>
        <Logo high="80%"/>
        <nav className={classes.DesktopOnly}>
           <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;