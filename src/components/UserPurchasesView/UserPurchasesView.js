//  IMPORTS  //

// CSS
import './UserPurchasesView.css';

// Material UI
import { Table, TableContainer, TableRow, TableCell, TableBody, TableHead, Button } from '@mui/material';

// React
import { useContext, Fragment, useState } from 'react';

// react-router-dom
import { useNavigate } from 'react-router-dom';

// Context
import OrderContext from '../../context/OrderContext';
import LogInContext from '../../context/LogInContext';


//  COMPONENT   //
const UserPurchasesView = () => {

    // Llamada a context
    const {ordersByUserId} = useContext(OrderContext)
    const {loggedIn} = useContext(LogInContext);

    // Instancia de useNavigate
    const navigate = useNavigate();   

    // Función de enrutamiento a productos
    const navigateProducts = () => {
        navigate('/products');
    }

    //  HTML   //
    return (
        <>
            {loggedIn ? (
                <>
                    {ordersByUserId.length === 0 ? (
                            <div className="container-userPurchasesView">
                                <div className="row-userPurchasesView justify-center">
                                    <h3 className="title-userPurchasesView">¡Aun no realizaste ninguna compra!</h3>
                                </div>
                                <div className="row-userPurchasesView justify-center">
                                    <div className="col-userPurchasesView">
                                        <Button id="btnSeguirComprando-userPurchasesView" onClick={navigateProducts}>Mirá todos los productos que tenemos para vos</Button>
                                    </div>
                                </div>  
                            </div>
                        ) : (
                            <div className='container-userPurchasesView'>
                                <div className="row-userPurchasesView justify-center m-0">
                                    <h3 className="title-userPurchasesView">Compras realizadas</h3>
                                </div>
                                <div className="row-userPurchasesView justify-center m-0">
                                    <div className='recuadro-userPurchasesView'></div>
                                </div>
                                <TableContainer id="tContainer-userPurchasesView">
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table" id="table-userPurchasesView">
                                        <TableHead id="tHead-userPurchasesView">
                                            <TableRow className='tCell-userPurchasesView'>
                                                <TableCell align="center">#</TableCell>
                                                <TableCell align="center">Precio final</TableCell>
                                                <TableCell align="center">Producto</TableCell>
                                                <TableCell align="center">Color</TableCell>
                                                <TableCell align="center">Talle</TableCell>
                                                <TableCell align="center">Cantidad</TableCell>
                                                <TableCell align="center">Precio</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody id="tBody-userPurchasesView">
                                            {ordersByUserId.map((o) => (
                                                <Fragment key={o.id}>
                                                    <TableRow align="center">
                                                        <TableCell component="th" scope="row" align="center" rowSpan={o.items.length + 1}>{o.id}</TableCell>
                                                        <TableCell component="th" scope="row" align="center" rowSpan={o.items.length + 1}>${o.total}</TableCell>
                                                    </TableRow>
                                                    {o.items.map((i) => {
                                                        return (
                                                            <TableRow key={`${i.id}-${i.color}-${i.amount}-${i.size}`} align="center">
                                                                <TableCell scope="row" align="center">{i.title}</TableCell>
                                                                <TableCell scope="row" align="center">{i.color}</TableCell>
                                                                <TableCell scope="row" align="center">{i.size}</TableCell>
                                                                <TableCell scope="row" align="center">{i.amount}</TableCell>
                                                                <TableCell scope="row" align="center">${i.totalPrice}</TableCell>
                                                            </TableRow>
                                                        )
                                                    })}
                                                </Fragment>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        )
                    }
                </>
            ):(
                <div className="container-userPurchasesView">
                    <div className="row-userPurchasesView justify-center">
                        <h3 className="title-userPurchasesView">Tenés que iniciar sesión para poder ver tus compras</h3>
                    </div>
                </div>
            )}
        </>
        
    )
}

export default UserPurchasesView;