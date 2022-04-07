import React, {useState} from 'react';
import Button from '@mui/material/Button';
import './ItemCount.css';

const ItemCount = ({stock, onAdd}) => {

    const [counter, setCounter] = useState(1)

    const substract = (e) => {
        e.stopPropagation();
        if (counter > 1) {
            setCounter(counter - 1)
        };
    };

    const add = (e) => {
        e.stopPropagation();
        if (counter < stock) {
            setCounter(counter + 1)
        };
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
                    <Button variant="contained" id='btnBuy-itemCount' onClick={(e) => onAdd(e, counter)}>Agregar al carrito</Button>
                </div>
            </div>
        </div>
    )
};

export default ItemCount;