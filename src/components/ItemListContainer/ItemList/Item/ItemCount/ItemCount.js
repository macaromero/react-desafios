import React, {useState} from 'react';
import Button from '@mui/material/Button';
import './ItemCount.css';

const ItemCount = ({stock, initial, onAdd}) => {

    const [counter, setCounter] = useState(parseInt(initial))

    const substract = () => {
        if (counter > 1) {
            setCounter(counter - 1)
        }
    };

    const add = () => {
        if (counter < stock) {
            setCounter(counter + 1)
        }
    };


    return(
        <div className='container-itemCount'>
            <div className='row-itemCount'>
                <div>
                    <Button variant="outlined" size="small" className='btn-itemCount' onClick={substract}>-</Button>
                </div>
                <div className='number-itemCount'>
                    <p counter={counter}>{counter}</p>
                </div>
                <div>
                    <Button variant="outlined" size="small" className='btn-itemCount' onClick={add}>+</Button>
                </div>
            </div>
            <div className='row-itemCount'>
                <div className='col-itemCount'>
                    <Button variant="contained" className='btnBuy-itemCount' onClick={() => onAdd(counter)}>Agregar al carrito</Button>
                </div>
            </div>
        </div>
    )
};

export default ItemCount;