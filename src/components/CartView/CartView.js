import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import './CartView.css';
import { TableFooter } from '@mui/material';
import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useNavigate } from 'react-router-dom';


const CartView = () => {   
    const {cartProducts, removeProductFromCart, emptyCart, isCartEmpty, total} = useContext(CartContext);
    const navigate = useNavigate();   
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.action.hover,
        },
    }));

    const goBack = () => {
        navigate('/products');
    }

    const buy = () => {
        navigate('/purchase')
    }

    const view = () => {
        if (isCartEmpty === false) {
            return (
                <div className='container-cartView'>
                    <div className='row-cartView'>
                        <Button onClick={goBack} id='btnVolver-cartView'><ArrowLeftIcon/> Seguir comprando</Button>
                        <Button color='error' variant='contained' onClick={(e) => emptyCart(e)}>Vaciar carrito</Button>
                    </div>
                    <TableContainer id="tContainer-cart">
                        <Table sx={{ minWidth: 700 }} aria-label="customized table" id="table-cart">
                            <TableHead id="tHead-cart">
                                <TableRow className='tCell-cart'>
                                    <TableCell align="center">Producto</TableCell>
                                    <TableCell align="center">Color</TableCell>
                                    <TableCell align="center">Talle</TableCell>
                                    <TableCell align="center">Cantidad</TableCell>
                                    <TableCell align="center">Precio unitario</TableCell>
                                    <TableCell align="center">Precio final</TableCell>
                                    <TableCell align="center"> - </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody id="tBody-cart">
                                {cartProducts.map((p) => (
                                    <StyledTableRow key={`row-${p.id}-color${p.color}-talle-${p.talle}`} align="center">
                                        <TableCell component="th" scope="row" key={`nombre-${p.id}`} align="center">{p.nombre}</TableCell>
                                        <TableCell component="th" scope="row" key={`color-${p.id}`} align="center">{p.color}</TableCell>
                                        <TableCell component="th" scope="row" key={`talle-${p.id}`} align="center">{p.talle}</TableCell>
                                        <TableCell component="th" scope="row" key={`cantidad-${p.id}`} align="center">{p.cantidad}</TableCell>
                                        <TableCell component="th" scope="row" key={`precioU-${p.id}`} align="center">{`$${p.precioUnitario}`}</TableCell>
                                        <TableCell component="th" scope="row" key={`precioT-${p.id}`} align="center">{`$${p.precioTotal}`}</TableCell>
                                        <TableCell component="th" scope="row" key={`delete-${p.id}`} align="center"><Button color='error' onClick={(e) => removeProductFromCart(e, p)}><DeleteIcon/></Button></TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                            <TableFooter id="tFooter-cart">
                                <TableRow>
                                    <TableCell className='tCell-cart' align="center">TOTAL</TableCell>
                                    <TableCell align="center">-</TableCell>
                                    <TableCell align="center">-</TableCell>
                                    <TableCell align="center">-</TableCell>
                                    <TableCell align="center">-</TableCell>
                                    <TableCell align="center">-</TableCell>
                                    <TableCell className='tCell-cart' align="center">{`$${total}`}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                    <div className='row-cartView justify-center mt'>
                        <Button onClick={buy} id='btnComprar-cartView'>Finalizar compra</Button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='container-cartView'>
                    <div className='row-cartView justify-center'>
                        <div>
                            <h3 className='h3-cartView'>¡No tenés productos en el carrito para efectuar una compra!</h3>
                            <Button variant='contained' id="btnSeguirComprando-cartView" onClick={goBack}>Seguí comprando</Button>
                        </div>
                    </div>
                </div>
            )
        }
    }
    
    return (
        view()  
    )
}

export default CartView;
  
