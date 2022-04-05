import { useState, useEffect } from 'react';
import './ItemList.css';
import Item from './Item/Item';
import {getProducts} from '../../../services/products.service';


const ItemList = ({id_cat}) => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(false);
    
    useEffect(() => {
        getProducts().then(data => {
            setProducts(data)
        }).catch((e) => {
            console.log(e)
        });
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