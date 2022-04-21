import './ItemDetail.css';
import {useContext, useState} from 'react';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Button, Backdrop, Snackbar, Alert, MenuItem, FormControl, Select, Radio, Tooltip } from '@mui/material';
import { pink, green, brown, grey, orange, red, yellow, lightBlue, teal} from '@mui/material/colors';
import ItemCount from '../../ItemListContainer/ItemList/Item/ItemCount/ItemCount'
import { useNavigate } from 'react-router-dom';
import CartContext from '../../../context/CartContext';


const ItemDetail = ({props}) => {

    const {addProductToCart} = useContext(CartContext)
    const imagen = props.imagen || [];
    const color = props.color || [];
    const talle = props.talle || [];
    const imagenAlt = props.imagenAlt || [];
    const {id, nombre, id_categoria, categoria, precio, stock} = props;

    const [colour, setColour] = useState('');
    const [size, setSize] = useState("");
    const [imgResultante, setImgResultante] = useState("");
    const [altImgResultante, setAltImgResultante] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [positionCarousel, setPositionCarousel] = useState(0);
    const [imgDimensions, setImgDimensions] = useState({height:0, width:0});
    const [selectedProperties, setSelectedProperties] = useState(true);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();


    const handleSnackbarOpen = () => {
        setOpen(true);
        const body = document.querySelector("body")
        body.setAttribute("id", "o-hidden")
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        const body = document.querySelector("body")
        body.removeAttribute("id", "o-hidden")
        setOpen(false);
    };

    const handleSizeChange = (event) => {
        setSize(event.target.value)
    }

    const handleColorChange = (event) => {
        setColour(event.target.value);
        let indexImg = parseInt(event.target.id);
        setImgResultante(imagen[indexImg])
        setAltImgResultante(imagenAlt[indexImg])
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
            return pink[200]
        } else if (color === "Rojo") {
            return red[400]
        } else if (color === "Anaranjado") {
            return orange[500]
        } else if (color === "Amarillo") {
            return yellow[500]
        } else if (color === "Blanco") {
            return grey[300]
        } else if (color === "Camel") {
            return orange[300]
        } else if (color === "Suela") {
            return brown[400]
        } else if (color === "Camuflado") {
            return green[900]
        } else if (color === "Gris") {
            return grey[600]
        } else if (color === "Nude") {
            return red[200]
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
        if ((colour !== '') && (size !== '')) {
            if (counter <= stock) {
                setQuantity(true);
                const producto = {
                    id: id,
                    nombre: nombre,
                    color: colour,
                    talle: size,
                    id_categoria: id_categoria,
                    categoria: categoria,
                    imagen: imgResultante,
                    imagenAlt: altImgResultante,
                    stock: stock,
                    precioUnitario: precio,
                    precioTotal:  precio*counter,
                    cantidad: counter 
                }
                addProductToCart(producto);
                setSelectedProperties(true)
            }
        } else {
            setSelectedProperties(false);
            handleSnackbarOpen()
        }
    };

    const endPurchase = () => {
        navigate('/cart');
    }

    
    return(
        <>
            {!selectedProperties && (
                <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleSnackbarClose}>
                <Snackbar open={open} onClose={handleSnackbarClose} autoHideDuration={6000} id="snackbar-itemDetail">
                    <Alert onClose={handleSnackbarClose} severity="error" id="alert-itemDetail">
                    Tenés que elegir talle y color del producto para agregarlo al carrito.
                    </Alert>
                </Snackbar>
                </Backdrop>
            )}

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
                                    {color.map((c, i) => {
                                        return(
                                            <div className="col-itemDetail" key={c}>
                                                <Tooltip title={c}>
                                                    <Radio {...controlProps(c)}
                                                    className="itemSelect-itemDetail" sx={{color: radioColor(c),
                                                    '&.Mui-checked': {color: radioColor(c)}}} id={i.toString()}/>
                                                </Tooltip>
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
                                        <Button id='btnBuy-itemDetail' onClick={endPurchase}>Comprar</Button>
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </> 
    );  
};

export default ItemDetail;