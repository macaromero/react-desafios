import './CartWidget.css';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, Button } from '@mui/material';
import MenuUnstyled from '@mui/base/MenuUnstyled';
import { styled } from '@mui/system';
import { useContext, useState, useRef } from 'react';
import CartContext from '../../../context/CartContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';


const CartWidget = () => {
    const {cartProducts, removeProductFromCart, isCartEmpty, emptyCart, total, setTotal} = useContext(CartContext);
    const [counter, setCounter] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const buttonRef = useRef(null);
    const menuActions = useRef(null);
    const navigate = useNavigate();

    const handleButtonClick = (event) => {
        if (isOpen) {
        setAnchorEl(null);
        } else {
        setAnchorEl(event.currentTarget);
        }
    };

    const handleButtonKeyDown = (event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
        if (event.key === 'ArrowUp') {
            menuActions.current?.highlightLastItem();
        }
        }
    };

    const close = () => {
        setAnchorEl(null);
        buttonRef.current.focus();
    };

    const createHandleMenuClick = (menuItem) => {
        return () => {
        close();
        };
    };

    const substract = (e, index) => {
        e.stopPropagation();
        if (cartProducts[index].cantidad > 1) {
            setCounter(counter - 1)
            cartProducts[index].cantidad -= 1
            cartProducts[index].precioTotal = cartProducts[index].precioUnitario*cartProducts[index].cantidad
            setTotal(total - cartProducts[index].precioUnitario)
        };
    };

    const add = (e, stock, index) => {
        e.stopPropagation();
        if (counter < stock) {
            setCounter(counter + 1)
            cartProducts[index].cantidad += 1
            cartProducts[index].precioTotal = cartProducts[index].precioUnitario*cartProducts[index].cantidad
            setTotal(total + cartProducts[index].precioUnitario)
        };
    };

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -3,
          top: 13,
          border: `2px solid rgb(247, 233, 233)`,
          padding: '0 4px',
        },
    }));

    const navigateToCart = (e) => {
        e.stopPropagation();
        navigate('/cart');
        close();
    }

    return(
        <div>
            <IconButton size="large"
            onClick={handleButtonClick}
            onKeyDown={handleButtonKeyDown}
            ref={buttonRef}
            aria-controls={isOpen ? 'simple-menu' : undefined}
            aria-expanded={isOpen || undefined}
            aria-haspopup="menu"
            >
                <StyledBadge badgeContent={cartProducts.length} id='badge-cartWidget'>
                    <ShoppingCartIcon id='cartIcon-cartWidget'/>
                </StyledBadge>
            </IconButton>
            <MenuUnstyled
                actions={menuActions}
                open={isOpen}
                onClose={close}
                anchorEl={anchorEl}
                componentsProps={{ listbox: { id: 'simple-menu' } }}
            >
                {
                    cartProducts.map((c, i) => {
                        return (
                            <div key={`${c.id}-${c.talle}-${c.color}`}>
                                <li onClick={createHandleMenuClick(c)}>
                                    <div className='container-cartWidget bg-cartWidget'>
                                        <div className='row-cartWidget jcAround-cartWidget'>
                                            <div className='col-cartWidget colImg-cartWidget'>
                                                <img src={`../../..${c.imagen}`} alt={c.imagenAlt} className='img-cartWidget'/>
                                            </div>
                                            <div className='col-cartWidget text-start'>
                                                <h4 className='nombreProd-cartWidget'>{c.nombre}</h4>
                                                <p className='datosProd-cartWidget'>Talle <strong>{c.talle}</strong></p>
                                                <p className='datosProd-cartWidget'>Color <strong>{c.color}</strong></p>
                                            </div>
                                            <div className='col-cartWidget'>
                                                <Button color='error' onClick={(e) => removeProductFromCart(e, c)}><DeleteIcon/></Button>
                                            </div>
                                        </div>
                                        <div className='row-cartWidget jcAround-cartWidget'>
                                            <div className='colBtn-cartWidget'>
                                                <Button variant="outlined" className='btn-itemCount' size='small' onClick={(e) => substract(e, i)}>-</Button>
                                                <div className='pCounter-cartWidget'>
                                                    <p >{c.cantidad}</p>
                                                </div>
                                                <Button variant="outlined" className='btn-itemCount' size='small' onClick={(e) => add(e, c.stock, i)}>+</Button>
                                            </div>
                                            <div className='col-cartWidget'>
                                                <h4 className='precioProd-cartWidget'>${c.precioTotal}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <div className='divider-cartWidget'></div>
                            </div>
                        ) 
                    })
                }
                {
                    !isCartEmpty && (
                        <div>
                            <div className='divider-cartWidget'></div>
                            <div>
                                <li onClick={createHandleMenuClick("total")}>
                                    <div className='container-cartWidget bg-cartWidget bottom-cartWidget'>
                                        <div className='row-cartWidget jcCenter-cartWidget'>
                                            <div className='col-cartWidget text-center pl-cartWidget'>
                                                <h4 className='nombreProd-cartWidget'>TOTAL:</h4>
                                            </div>
                                            <div className='col-cartWidget text-center pl-cartWidget'>
                                                <h4 className='nombreProd-cartWidget'>${total}</h4>
                                            </div>
                                        </div>
                                        <div className='row-cartWidget jcAround-cartWidget'>
                                            <Button id='btnBuy-cartWidget' variant='contained' size='small' onClick={(e) => navigateToCart(e)}>Comprar</Button>
                                        </div>
                                        <div className='row-cartWidget jcAround-cartWidget'>
                                            <Button id='btnEmpty-cartWidget' variant='contained' color='error' size='small' onClick={(e) => emptyCart(e)}>Vaciar carrito</Button>
                                        </div>
                                    </div>
                                </li>
                            </div>
                        </div>
                    )
                }
                                
            </MenuUnstyled>
        </div>
    );
};

export default CartWidget;
