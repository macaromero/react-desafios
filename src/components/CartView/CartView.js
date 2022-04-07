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
import { useContext} from 'react';
import CartContext from '../../context/CartContext';


const CartView = () => {   
    const {cartProducts} = useContext(CartContext)     
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.action.hover,
        },
    }));

    const finalValue = () => {
        let total = 0
        cartProducts.map((p) => {
            return total += p.precioTotal
        })
        return total
    }
    
    return (
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
                        <StyledTableRow key={`row-${p.id}`} align="center">
                            <TableCell component="th" scope="row" key={`nombre-${p.id}`} align="center">{p.nombre}</TableCell>
                            <TableCell component="th" scope="row" key={`color-${p.id}`} align="center">{p.color}</TableCell>
                            <TableCell component="th" scope="row" key={`talle-${p.id}`} align="center">{p.talle}</TableCell>
                            <TableCell component="th" scope="row" key={`cantidad-${p.id}`} align="center">{p.cantidad}</TableCell>
                            <TableCell component="th" scope="row" key={`precioU-${p.id}`} align="center">{`$${p.precioUnitario}`}</TableCell>
                            <TableCell component="th" scope="row" key={`precioT-${p.id}`} align="center">{`$${p.precioTotal}`}</TableCell>
                            <TableCell component="th" scope="row" key={`delete-${p.id}`} align="center"><Button color='error'><DeleteIcon/></Button></TableCell>
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
                        <TableCell className='tCell-cart' align="center">{`$${finalValue()}`}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
      </TableContainer>
    )
}

export default CartView;
  
