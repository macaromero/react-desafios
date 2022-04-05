import React, {useState} from 'react';
import Button from '@mui/material/Button';
import './ItemCount.css';

const ItemCount = ({stock, initial, onAdd}) => {

    const [counter, setCounter] = useState(parseInt(initial))

    const substract = (e) => {
        if (counter > 1) {
            setCounter(counter - 1)
        };
        e.stopPropagation();
    };

    const add = (e) => {
        if (counter < stock) {
            setCounter(counter + 1)
        };
        e.stopPropagation();
    };


    return(
        <div className='container-itemCount'>
            <div className='row-itemCount'>
                <div>
                    <Button variant="outlined" size="small" className='btn-itemCount' onClick={(e) => substract(e)}>-</Button>
                </div>
                <div className='number-itemCount'>
                    <p counter={counter}>{counter}</p>
                </div>
                <div>
                    <Button variant="outlined" size="small" className='btn-itemCount' onClick={(e) => add(e)}>+</Button>
                </div>
            </div>
            <div className='row-itemCount'>
                <div className='col-itemCount'>
                    <Button variant="contained" className='btnBuy-itemCount' onClick={(e) => onAdd(counter, e)}>Agregar al carrito</Button>
                </div>
            </div>
        </div>
    )
};

export default ItemCount;