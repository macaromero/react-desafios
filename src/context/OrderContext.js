// Imports de React
import { createContext, useState } from "react";

// Imports de la base de datos y firestore
import db from '../firebase';
import { collection, getDocs, addDoc} from "firebase/firestore";


// Creación del context
const OrderContext = createContext();


//  CONTEXT   //  
const OrderProvider = ({children}) => {

    // Estados para setear las ordenes
    const [order, setOrder] = useState({});
    const [ordersDb, setOrdersDb] = useState([]);
    const [orderSuccess, setOrderSuccess] = useState();
    const [ordersByUserId, setOrdersByUserId] = useState([]);


    //  FUNCTIONS   //

    // Función para traer todas las órdenes
    const getOrders = async () => {
        const ordersCollection = collection(db, "orders");
        const ordersSnapshot = await getDocs(ordersCollection);
        const ordersList = ordersSnapshot.docs.map(list => {
            let orden = list.data();
            orden.id = list.id;
            return orden
        })
        return setOrdersDb(ordersList)
    }

    // Función para traer todas las órdenes de un mismo usuario
    const getOrderByUserId = (id) => {
        getOrders()
        let userOrder = [];
        ordersDb.map((o) => {
            if (o.buyer.id === id) {
                return userOrder.push(o)
            }
        })
        localStorage.setItem("orders", JSON.stringify(userOrder));
        return setOrdersByUserId(userOrder)
    }; 

    // Función para crear una orden nueva
    const createOrder = async (objOrder, user_id) => {
        const orderDb = collection(db, 'orders');
        const orderDoc = await addDoc(orderDb, objOrder);
        return orderDoc;
    }


    // Data para enviar a los children
    const data = {
        getOrders, 
        getOrderByUserId,
        setOrdersByUserId,
        ordersByUserId,
        createOrder,
        order,
        setOrder,
        ordersDb,
        orderSuccess,
        setOrderSuccess
    }

    return (
        <OrderContext.Provider value={data}>
            {children}
        </OrderContext.Provider>
    )
};

export {OrderProvider};
export default OrderContext;