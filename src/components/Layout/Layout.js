import React, {Component} from 'react';
import classes from './Layout.css';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

    state={
        showSideDrawer:false
    }

    SideDrawerClosed=()=>{
        this.setState({showSideDrawer:false});
    }

    toggleHandler=()=>{
        let update=this.state.showSideDrawer;
        update=!update;
        this.setState({showSideDrawer:update});

    }

    render(){
        return (
        <div>
            <Toolbar click={this.toggleHandler}/>
            <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosed}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </div>
        );
      }}

export default Layout;