import * as actionTypes from './actions'


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon:1.7
}

const initState = {
    ingredients:{
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
    totalPrice:4,
}
 const reducer = (state=initState,action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.name]: state.ingredients[action.name]+1
                },
                totalPrice:state.totalPrice+INGREDIENT_PRICES[action.name]
                
            }
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.name]: state.ingredients[action.name]-1
                },
                totalPrice:state.totalPrice-INGREDIENT_PRICES[action.name]
                
            }  
            
        default:
            return state;   
    }
 };

 export default reducer;