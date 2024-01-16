import { MetaReducer, createAction, createReducer, on } from "@ngrx/store"

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    quantity: number;
    rating: {
        rate: number;
        count: number;
    };
}

export interface IAppState {
    cartList: any[]
    total: number;
    subTotal: number;
}

const store = JSON.parse(sessionStorage.getItem('cartList') as IAppState | any)

const appState = store ? store.app : {
    cartList: [],
    total: 0,
    subTotal: 0
}


export const appInitialState: IAppState = appState



export const addToCart = createAction('addToCart', (product: Product) => ({product}))

export const removeToCart = createAction('removeToCart', (product: Product) => ({product}))

export const removeFromCart = createAction('removeFromCart', (productId) => ({productId}))

export const updateCartTotal = createAction('updateCartTotal')

export const updateCartSubTotal = createAction('updateCartTotal')

export const loadCartFromSessionStorage = createAction('loadCartFromSessionStorage')

export const appReducer = createReducer(
    appInitialState,
    on(addToCart, (state:any , product: any) => {
            
            const existingItem = state.cartList.find((item:any) => item.product.id === product.product.id)

            
            if (existingItem) {
                const updateCart = state.cartList.map((item:any) => 
                item.product.id === existingItem.product.id
                    ? { ...item, quantity: (item.quantity || 1) + 1 }
                    : item
                )
                return { ...state, cartList: updateCart }
            } else {
                const productWithQuantity = {...product, quantity: 1} 
                return { ...state, cartList:[...state.cartList, productWithQuantity]}
            }

            
    }),

    on(removeToCart, (state:any , product: any) => {
            
        const existingItem = state.cartList.find((item:any) => item.product.id === product.product.id)
        const existingQuantity = state.cartList.find((item:any) => item.quantity > 1)
        
        
        
        if (existingItem && existingQuantity) {
            const updateCart = state.cartList.map((item:any) => 
                item.product.id === existingItem.product.id
                    ? { ...item, quantity: (item.quantity || 1) - 1 }
                    : item
            
            )
            
            return { ...state, cartList: updateCart }
        } else {
            
            const updatedProducts = state.cartList.filter((p: any) => p.product.id !== product.product.id);
            return { ...state, cartList: updatedProducts };
        }

        
    }),

    on(removeFromCart, (state, { productId }) => {
        const updatedProducts = state.cartList.filter(p => p.id !== productId.id);
        return { ...state, products: updatedProducts };
    }),

    on(updateCartSubTotal, (state) => {
        const total = state.cartList.reduce((acc, product) => {
             const productPrice = product.product.price || 0;
             return acc + productPrice;
        }, 0);

        const validTotal = isNaN(total) ? 0 : total;

        return { ...state, subTotal: validTotal }
    }),

    on(updateCartTotal, (state) => {
        const total = state.cartList.reduce((acc, product) => {
             const productPrice = product.product.price || 0;
             const productQuantity = product.quantity || 1;
             return acc + productPrice * productQuantity;
        }, 0);

        const validTotal = isNaN(total) ? 0 : total;

        return { ...state, total: validTotal }
    }),

    on(loadCartFromSessionStorage, (state) => {
        const savedStateString = sessionStorage.getItem('cartList');
        if (savedStateString) {
          const savedState: Partial<IAppState> = JSON.parse(savedStateString);
          return { ...state, ...savedState };
        }
        return state;
    })

)


export function persistStateMetaReducer(reducer: any) {
    return (state: any, action: any) => {
      const nextState = reducer(state, action);
  
      sessionStorage.setItem('cartList', JSON.stringify(nextState));
  
      return nextState;
    };
  }
  export const metaReducers: MetaReducer<any>[] = [persistStateMetaReducer];

