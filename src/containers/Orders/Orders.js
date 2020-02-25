import React, {Component} from 'react'
import Order from './Order';
import axios from '../../axios-order'
import errorHandler from '../../errorHandler/errorHandler'

class Orders extends Component {

    state={
        orders:[],
        loading:true
    }
    componentDidMount() {
        axios.get('/orders.json').
        then(res=>{
            const fetchedOrders=[];
            for(let key in res.data){
                fetchedOrders.push(
                    {...res.data[key],
                    id:key
                    });
            }
            this.setState({loading: false, orders: fetchedOrders});        })
        .catch(err=>{
            this.setState({loading:false});

        });
    }
   render(){

  
       return(
        <div>
       ]    {this.state.orders.map(el=> {
           return <Order key={el.id} price={+el.price} ingredients={el.ingredients} />
       })}
        </div>
       );
}}

export default errorHandler(Orders,axios);