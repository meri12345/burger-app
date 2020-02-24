import React,{Component} from 'react';
import Modal from '../components/UI/Modal/Modal';

const errorHandler = (WrappedComponent,axios) =>{
    return class extends Component{
        
        state={
            error:null
        }

        constructor(){
            super();
       this.resInterceptor= axios.interceptors.response.use(res=>res,
                err=>{
                  this.setState({error:err}) ;
                });
                this.reqInterceptor= axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            })
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
 
        }
        errorConfirm=()=>{
            this.setState({error:null});
        }
        render(){
            return(
                <div>
                <Modal show={this.state.error} modalClosed={this.errorConfirm}>
            {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props}/>
                </div>
            );
    }
}}
export default errorHandler;