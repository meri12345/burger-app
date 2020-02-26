import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-order'
import Input from '../../../components/UI/Input/Input'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component{
state={
    orderForm:{ 
            name:{
                elementType:'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Name'
                },
                value:'',
                validation:{
                    required:true,
                    minLen:5,
                    maxLen:22
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true,
                    minLen:5,
                    maxLen:22
                },
                valid:false,
                touched:false
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Zip'
                },
                value:'',
                validation:{
                    required:true,
                    minLen:5,
                    maxLen:22
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Contry'
                },
                value:'',
                validation:{
                    required:true,
                    minLen:5,
                    maxLen:22
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Email'
                },
                value:'', 
                validation:{
                    required:true,
                    minLen:5,
                    maxLen:22
                },
                valid:false,
                touched:false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options: [
                        {value:'cheapest',displayValue:'Cheapest'},
                        {value:'fastest',displayValue:'Fastest'}
                    ],
                    
                },
                value:'cheapest',
                validation:{},
                valid:true
            },},
    loading:false,
    formValid:false

}

orderHandler=(event)=>{
event.preventDefault();
   this.setState({loading:true})
   const data = {};
   for(let el in this.state.orderForm){
    data[el]=this.state.orderForm[el].value
   }
        const order= {
            ingredients:this.props.ingredients,
            price:this.props.price,
            orderData:data
           
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

changehandler=(event,id)=>{
    const form={
        ...this.state.orderForm
    }
    const updatedForm = {
        ...form[id]
    }
    updatedForm.value=event.target.value;
    updatedForm.touched=true;
    updatedForm.valid=this.validation(updatedForm.value,updatedForm.validation)
    form[id]=updatedForm;
    let formValid=true;
    
    for(let el in form){
        
        formValid=form[el].valid && formValid;
    }
    console.log(formValid);
    this.setState({orderForm:form, formValid:formValid});
  
}

validation(value,rules){
let isValid =true;

    if(rules.required){
        isValid=value.trim() !=='' && isValid;
    }

    if(rules.minLen){
        isValid=value.length >= rules.minLen && isValid;
    }
    if(rules.maxLen){
        isValid=value.length <= rules.maxLen && isValid;
    }
    return isValid;
}

render(){

    const elementsArray=[];
    for (let key in this.state.orderForm){
elementsArray.push({
    id:key,
    config:this.state.orderForm[key]
})
    }

    let form = ( <form onSubmit={this.orderHandler}>
         {elementsArray.map(el=>(
             <Input  key={el.id} 
             invalid={!el.config.valid}
             elementType={el.config.elementType} 
             elementConfig={el.config.elementConfig} 
             value={el.config.value}
             touched={el.config.touched}
             change={(event)=>this.changehandler(event,el.id)}/> 
        ))}       
        <Button disabled={!this.state.formValid} btnType="Success">Finish Order</Button>

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