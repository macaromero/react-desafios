import { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({children}) => {
    const [cartProducts, setCartProducts] = useState([]);
    const [isCartEmpty, setIsCartEmpty] = useState(true);
    const [total, setTotal] = useState(0);


    const addProductToCart = (product) => {
        setIsCartEmpty(false)
        let productExists = cartProducts.find((cartProduct) => {
            if ((cartProduct.id === product.id) && (cartProduct.color === product.color) && (cartProduct.talle === product.talle)) {
                return product
            }
        });

        if (!productExists) {
            setCartProducts(cartProducts => [...cartProducts, product])
            setTotal(total + product.precioTotal)
        }
    };

    const removeProductFromCart = (e, product) => {
        e.stopPropagation()
        setCartProducts(cartProducts.filter((p) => {
            setTotal(total - product.precioTotal)
            return p !== product
        }));
        if (cartProducts.length-1 === 0) {
            setIsCartEmpty(true)
            setTotal(0)
        }
    };

    const emptyCart = (e) => {
        e.stopPropagation()
        setCartProducts([]);
        setIsCartEmpty(true)
        setTotal(0)
    };
 
    const data = {
        cartProducts,
        addProductToCart,
        removeProductFromCart,
        emptyCart,
        isCartEmpty,
        setTotal,
        total
    }

    return (
        <CartContext.Provider value={data}>
            {children}
        </CartContext.Provider>
    )
};

export {CartProvider};
export default CartContext;