import { useState, useEffect } from 'react';
import './ItemList.css';
import Item from './Item/Item';
import productsJson from '../../../json products/products.json';


const ItemList = () => {

    const [products, setProducts] = useState([]);

    const getProducts = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return resolve(productsJson);
            }, 2000);
        });
    };

    useEffect(() => {
        getProducts().then(data => {
            setProducts(data)
        }).catch((e) => {
            console.log(e)
        });
    }, []);


    return(
        <div className="container-ItemListContainer">
            <div className="row-ItemListContainer">
                {products.map((p) => {
                    return(
                        <div className="col-ItemListContainer" key = {p.id}>
                            <Item
                                props = {p}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ItemList;