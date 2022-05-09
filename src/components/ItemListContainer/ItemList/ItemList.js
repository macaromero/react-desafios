//  IMPORTS  //

// CSS
import './ItemList.css';

// React
import { useState, useEffect } from 'react';

// Database & Firestore
import db from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';

// Component
import Item from './Item/Item';


//  COMPONENT  //
const ItemList = ({id_cat}) => {
    
    // States de productos y categorías
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(false);


    // Función para traer a los productos de la base de datos
    const getProducts = async() => {
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map((list) => {
            let product = list.data()
            product.id = list.id
            return product
        })
        return setProducts(productsList)
    }


    // UseEffect para llamar a la función
    useEffect(() => {
        getProducts()
    }, []);

    useEffect(() => {
        if (id_cat !== null) {
            setCategory(true)
        } else  {
            setCategory(false)
        };
    }, [id_cat]);


    //  HTML  //
    return(
        <div className="row-itemList">
            {
                category ? (
                    products.filter(product => product.id_categoria === id_cat).map(pFiltrado => {        
                        return(
                            <div className="col-itemList" key = {pFiltrado.id}>
                                <Item
                                    props = {pFiltrado}
                                />
                            </div>
                        )
                    })
                ) :
                    products.map(product => {        
                        return(
                            <div className="col-itemList" key = {product.id}>
                                <Item
                                    props = {product}
                                />
                            </div>
                        )
                    })
            }
            
        </div>
    );
};

export default ItemList;