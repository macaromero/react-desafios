import './ItemDetail.css';
import {useContext, useState} from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Button } from '@mui/material';
import { pink, green, brown, grey, orange, red, yellow, lightBlue, teal} from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import ItemCount from '../../ItemListContainer/ItemList/Item/ItemCount/ItemCount'
import { useNavigate } from 'react-router-dom';
import CartContext from '../../../context/CartContext';

const ItemDetail = ({props}) => {

    const {addProductToCart} = useContext(CartContext)
    const imagen = props.imagen || [];
    const color = props.color || [];
    const talle = props.talle || [];
    const {id, nombre, id_categoria, categoria, imagenAlt, precio, stock} = props;

    const [colour, setColour] = useState('');
    const [size, setSize] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [productToBuy, setProductToBuy] = useState({});
    const [positionCarousel, setPositionCarousel] = useState(0);
    const [imgDimensions, setImgDimensions] = useState({height:0, width:0});
    const navigate = useNavigate();


    const handleSizeChange = (event) => {
        setSize(event.target.value)
    }

    const handleColorChange = (event) => {
        setColour(event.target.value);
    };

    const controlProps = (selectedColor) => ({
        checked: colour === selectedColor,
        onChange: handleColorChange,
        value: selectedColor,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': selectedColor }
    });

    const radioColor = (color) => {
        if (color === "Negro") {
            return grey[900]
        } else if (color === "Marrón") {
            return brown[800]
        } else if (color === "Verde") {
            return teal[400]
        } else if (color === "Rosa") {
            return pink[100]
        } else if (color === "Rojo") {
            return red[400]
        } else if (color === "Anaranjado") {
            return orange[400]
        } else if (color === "Amarillo") {
            return yellow[[500]]
        } else if (color === "Blanco") {
            return grey[50]
        } else if (color === "Camel") {
            return brown[400]
        } else if (color === "Suela") {
            return brown[200]
        } else if (color === "Camuflado") {
            return green[900]
        } else if (color === "Gris") {
            return grey[600]
        } else if (color === "Nude") {
            return red[50]
        } else if (color === "Celeste") {
            return lightBlue[400]
        }
    }

    const onImgLoad = ({ target: img }) => {
        const { offsetHeight, offsetWidth } = img;
        setImgDimensions({height:offsetHeight, width:offsetWidth});
    };

    const moveLeft = () => {
        if (positionCarousel < 0) {
            setPositionCarousel(positionCarousel + imgDimensions.width);
        }  
    };

    const moveRight = () => {
        if (positionCarousel > -(imgDimensions.width*(imagen.length-1))) {
            setPositionCarousel(positionCarousel - imgDimensions.width);
        } 
    };

    const style = {"transform": `translateX(${positionCarousel}px)`};

    const onAdd = (e, counter) => {
        e.stopPropagation();
        if (counter <= stock) {
            setQuantity(counter);
            const producto = {
                id: id,
                nombre: nombre,
                color: colour,
                talle: size,
                id_categoria: id_categoria,
                categoria: categoria,
                imagen: imagen,
                precioUnitario: precio,
                precioTotal:  precio*counter,
                cantidad: counter 
            }
            setProductToBuy(producto);
            addProductToCart(producto);
        }
    };

    const endPurchase = () => {
        navigate('/cart');
    }

    
    return(
        <div className="container-itemDetail">
            <div className='rowBtn-itemDetail w-60' style={{top: imgDimensions.height/2}}>
                    <Button onClick={moveLeft}><ArrowLeftIcon className='btnArrow-itemDetail'/></Button> 
                    <Button onClick={moveRight}><ArrowRightIcon className='btnArrow-itemDetail'/></Button> 
            </div>
            <div className="row-itemDetail space-between">
                <div className="col-itemDetail w-60">
                    <div className='imgDiv-itemDetail' style={{height:imgDimensions.height}}>
                        <div className='imgAnimation-itemDetail' style={style}>
                            {imagen.map((img, i) => {
                                return (
                                    <img
                                    onLoad={onImgLoad}
                                    alt={imagenAlt[i]}
                                    src={`../../..${img}`}
                                    className="img-itemDetail"
                                    key={img}
                                    />
                                )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="col-itemDetail w-30 flex-start">
                    <div className="row-itemDetail">
                        <h1 className='title-itemDetail'>{nombre}</h1>
                    </div>
                    <div className="row-itemDetail">
                        <p className='price-itemDetail'>${precio}</p>
                    </div>
                    <div className="row-itemDetail">
                        <div className="col-itemDetail w-100">
                            <p className='subtitle-itemDetail'>Color</p>
                            <div className='row-itemDetail'>
                                {color.map(c => {
                                    return(
                                        <div className="col-itemDetail" key={c}>
                                            <Radio {...controlProps(c)}
                                            className="itemSelect-itemDetail" sx={{color: radioColor(c),
                                                '&.Mui-checked': {color: radioColor(c)}}}/>
                                        </div>
                                        )
                                    })
                                }
                            </div>
                            <p className='subtitle-itemDetail'>Talle</p>
                            <div className='row-itemDetail'>
                                <FormControl sx={{ m: 1, minWidth: 80 }}>
                                    <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={size}
                                    onChange={handleSizeChange}
                                    autoWidth
                                    >
                                        {talle.map(t => {
                                            return( 
                                                <MenuItem value={t} key={t}>{t}</MenuItem>       
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>   
                            <div className="row-itemDetail">
                                <p className='subtitle-itemDetail'>Detalle</p>
                                <p className='description-itemDetail'>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos reiciendis doloremque dolorum et odio voluptatibus fugit nisi qui consectetur minus ad corrupti pariatur, possimus iure quis aperiam, rem, ipsa iusto?
                                </p>
                            </div>   
                            <div className="btn-itemDetail">
                                {quantity === 0 ? (
                                    <ItemCount stock={stock} onAdd={onAdd}/>  
                                ) : (
                                    <Button variant="contained" className='btnBuy-itemDetail' onClick={endPurchase}>Comprar</Button>
                                )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
    
};

export default ItemDetail;