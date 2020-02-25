import React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import Checkout from './containers/Checkout/Checkout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import {Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      
      <Layout>
        <Route path='/' exact component={BurgerBuilder}/>
        <Route path='/checkout' component={Checkout}/>

      </Layout>
    );
  }
}

export default App;
