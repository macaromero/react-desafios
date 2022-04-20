import './PurchaseView.css';
import { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import CartContext from "../../context/CartContext";
import { Button } from '@mui/material';
import db from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Purchase = () => {
    const {cartProducts, total, setCartProducts, setIsCartEmpty, isCartEmpty} = useContext(CartContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "", 
        phone: "",
        email:""
    });
    const [order, setOrder] = useState(
        {
            buyer: form,
            items: cartProducts.map(p => {
                return {
                    id: p.id,
                    title: p.nombre,
                    price: p.precioUnitario
                }
            }),
            date: new Date().toLocaleString('es-AR'),
            total: total
        }
    );
    const [orderSuccess, setOrderSuccess] = useState()


    const formChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value,
        })
    }

    const createOrder = async (objOrder) => {
        const orderDb = collection(db, 'orders');
        const orderDoc = await addDoc(orderDb, objOrder);
        setOrderSuccess(orderDoc.id)
    }

    const sendForm = (e) => {
        e.preventDefault();
        let objOrder = {
            ...order,
            buyer: form
        }
        setOrder({
            ...order,
            buyer:form
        });
        createOrder(objOrder)
        setCartProducts([])
        setIsCartEmpty(true)
    };

    const goBack = () => {
        navigate('/products');
    }

    return (
        <>
            {orderSuccess ? (
                    <div className="container-purchase">
                        <div className="row-purchase">
                            <h3 className="title-purchase">¡Tu compra se generó correctamente!</h3>
                        </div>
                        <div className="row-purchase">
                            <p>Tu número de orden es <strong>{orderSuccess}</strong></p>
                        </div>  
                    </div>
                ) : (
                    <>
                        {isCartEmpty ? (
                            <div className='container-purchase'>
                                <div className="row-purchase">
                                    <h3 className="title-purchase">¡No tenés productos en el carrito para efectuar una compra!</h3>
                                </div>
                                <div className="row-purchase">
                                    <div className="col-purchase">
                                        <Button id="btnSeguirComprando-purchaseView" onClick={goBack}>Seguí comprando</Button>
                                    </div>
                                </div> 
                            </div>
                        ) : (
                            <div className='container-purchase'>
                                <div className="row-purchase">
                                    <h3 className="title-purchase">Completá tus datos para finalizar la compra</h3>
                                </div>
                                <div className="row-purchase">
                                    <div className="col-purchase">
                                        <form onSubmit={sendForm}>
                                            <div className="row-purchase mb-3">
                                                <TextField label="Nombre" name="name" value={form.name} required fullWidth onChange={(e) => formChange(e)}/>
                                            </div>
                                            <div className="row-purchase mb-3">
                                                <TextField label="Teléfono" name="phone" value={form.phone} required fullWidth onChange={(e) => formChange(e)}/>
                                            </div>
                                            <div className="row-purchase mb-3">
                                                <TextField label="Correo electrónico" name="email" value={form.email} type='email' required fullWidth onChange={(e) => formChange(e)}/>
                                            </div>
                                            <div>
                                                <Button type='submit' id='btnSend-purchase'>Enviar</Button>
                                            </div>
                                        </form>
                                    </div>
                                </div> 
                            </div>
                        )}
                    </>
                )
            }
        </>
    )
}


export default Purchase;