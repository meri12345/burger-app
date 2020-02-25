import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component{
state={
    name:'',
    email:'',
    address:{
        street:'',
        postalCode:''
    },
    loading:false
}

orderHandler=(event)=>{
event.preventDefault();
console.log(this.props.ingredients);
   this.setState({loading:true})
        const order= {
            ingredients:this.props.ingredients,
            price:this.props.price,
            customer:{
                name:'Meri',
                adress:{
                    street:'tiransa',
                    zipCode:'123456',
                    country:'macedonia'
                },
                email:'meri@gmail.com'
        },
        deliveryMethod:'fastest'
    }
       axios.post('/orders.json',order)
       .then(response => {
           console.log(response);
        this.setState({loading:false});
        this.props.history.push('/');

       }
       ) 
       .catch(error=>{
        this.setState({loading:false});
        console.log(error);
       });
}

render(){

    let form = ( <form>
                
        <input className={classes.Input} type='text' placeholder='name' name='name'/>      
        <input className={classes.Input} type='email' placeholder='email' name='email'/>
        <input className={classes.Input} type='text' placeholder='street' name='street'/>      
        <input className={classes.Input} type='text' placeholder='postal' name='postal'/>
        <Button click={this.orderHandler} btnType="Success">Finish Order</Button>

    </form>);

    if(this.state.loading){
        form=(<Spinner/>);
    }
    return(
        <div className={classes.ContactData}>
            <h4>Enter Contact Data:</h4>
           {form}
        </div>
    );
}
}

export default ContactData;