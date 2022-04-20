import { useState, useEffect } from 'react';
import './ItemList.css';
import Item from './Item/Item';
import db from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';


const ItemList = ({id_cat}) => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(false);

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