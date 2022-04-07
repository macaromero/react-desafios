import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext } from 'react';
import CartContext from '../../../context/CartContext';


const CartWidget = () => {

    const {cartProducts} = useContext(CartContext);

    return(
        <IconButton size="large">
            <ShoppingCartIcon />
        </IconButton>
    );
};

export default CartWidget; 