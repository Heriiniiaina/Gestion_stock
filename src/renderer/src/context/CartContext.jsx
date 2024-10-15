import React,{createContext,useReducer} from "react";

const initialiseState = {
    cart:[]
}

const cartReducer = (state,action)=>{
    switch(action.type){
        case "ADD_TO_CART":
            const exist = state.cart.find(item=> item._id == action.payload._id)
            if(exist)
                return{
                    ...state,
                    cart:state.cart.map(item=>item._id=== action.payload._id ? {...exist,quantity:exist.quantity+1} :item)
                }
            else{
                return {
                    ...state,
                    cart:[...state.cart,{...action.payload,quantity:1}]
                }
            }
        case 'REMOVE_FROM_CART':
                return {
                    ...state,
                    cart: state.cart.filter(item => item._id !== action.payload)
                };
        case 'UPDATE_QUANTITY':
                return {
                    ...state,
                    cart: state.cart.map(item => item._id === action.payload._id ? { ...item, quantity: action.payload.quantity } : item)
                };
        default:
                return state;
    }
}
export const CartContext = createContext()

export const CartProvider=({children})=>{
    const [state,dispatch] = useReducer(cartReducer,initialiseState)
    return(
        <CartContext.Provider value={{state,dispatch}}>
        {children}
        </CartContext.Provider>
    )
       
}