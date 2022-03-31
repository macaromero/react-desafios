import { useState, useEffect } from 'react';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import Button from '@mui/material/Button';
import {getProductById} from '../../services/products.service';
import ItemDetail from './ItemDetail/ItemDetail';
import './ItemDetailContainer.css';


const ItemDetailContainer = () => {
    const [product, setProduct] = useState({});

    useEffect(() => {
        getProductById(1).then(data => {
            setProduct(data)
        }).catch((e) => {
            console.log(e)
        });
    }, [])

    return(
        <div className="container-itemDetailContainer">
            <div className='row-itemDetailContainer'>
                <Button><ArrowLeftIcon/> Volver</Button>
                <Button>Categoría: {product.categoria}</Button>
            </div>

            <div className='row-itemDetailContainer'>
                <ItemDetail props={product}/>
            </div>
            
        </div>
    );
};

export default ItemDetailContainer;