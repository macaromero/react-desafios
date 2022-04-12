import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import './Item.css';
import ItemCount from './ItemCount/ItemCount';
import {useContext, useState} from 'react'
import CartContext from '../../../../context/CartContext';
import { Button, FormControl, Radio, Select, MenuItem, InputLabel} from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { pink, green, brown, grey, orange, red, yellow, lightBlue, teal} from '@mui/material/colors';

const Item = ({props}) => {
  const {addProductToCart} = useContext(CartContext)
  const imagen = props.imagen || [];
  const color = props.color || [];
  const talle = props.talle || [];
  const imagenAlt = props.imagenAlt || [];
  const {id, categoria, id_categoria, nombre, precio, stock} = props;
  const [positionCarousel, setPositionCarousel] = useState(0);
  const [colour, setColour] = useState('');
  const [size, setSize] = useState("");
  const [imgResultante, setImgResultante] = useState("");
  const [altImgResultante, setAltImgResultante] = useState("");
  const navigate = useNavigate();


  const moveLeft = (e) => {
    e.stopPropagation()
    if (positionCarousel < 0) {
      setPositionCarousel(positionCarousel + 315);
    }  
  };

  const moveRight = (e) => {
    e.stopPropagation()
    if (positionCarousel > -(315*(imagen.length-1))) {
        setPositionCarousel(positionCarousel - 315);
    } 
  };

  const style = {"transform": `translateX(${positionCarousel}px)`};

  const handleColorChange = (e) => {
    e.stopPropagation();
    setColour(e.target.value);
    let indexImg = parseInt(e.target.id);
    setImgResultante(imagen[indexImg])
    setAltImgResultante(imagenAlt[indexImg])
  };

  const controlProps = (selectedColor) => ({
    checked: colour === selectedColor,
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
        return grey[300]
    } else if (color === "Camel") {
        return brown[400]
    } else if (color === "Suela") {
        return brown[200]
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


  const handleSizeChange = (e) => {
    e.stopPropagation()
    setSize(e.target.value);
  }

  const onAdd = (e, counter) => {
    e.stopPropagation();
    if (counter <= stock) {
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
    };
  };


  const navigateToDetail = () => {
    navigate(`/productos/${id}`);
  };

  return (
    <div onClick={navigateToDetail}>
      <Card className="card-item">
        <div className='rowBtn-item'>
            <Button onClick={(e) => moveLeft(e)}><ArrowLeftIcon className='btnArrow-item'/></Button> 
            <Button onClick={(e) => moveRight(e)}><ArrowRightIcon className='btnArrow-item'/></Button> 
        </div>
        <div className='imgDiv-item'>
          <div className='imgAnimation-item' style={style}>          
            {imagen.map((img, i) => {
              return (
                <CardMedia
                component="img"
                alt={imagenAlt[i]}
                image={img}
                className="img-item"
                key={img}
                />
              )
            })}
          </div> 
        </div>
        <CardContent id='cardContent-item'>
            <div>
                <h1 className='title-item'>{nombre}</h1>
            </div>
            <div>
                <h2 className='price-item'>${precio}</h2>
            </div>
            <div className='row-item' id="selectColor-item">
              {color.map((c, i) => {
                return(
                    <div className="col-item" key={c}>
                        <Radio {...controlProps(c)}
                        className="itemSelect-item" sx={{color: radioColor(c),
                        '&.Mui-checked': {color: radioColor(c)}}}
                        onClick={(e) => handleColorChange(e)}  id={i.toString()}/>
                    </div>
                    )
                })
              }
            </div>
            <div className='row-item'>
              <FormControl id="selectSize-item">
                <InputLabel id="demo-simple-select-label">Talle</InputLabel>
                <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={size}
                onChange={(e) => handleSizeChange(e)}

                >
                  {talle.map(t => {
                      return( 
                          <MenuItem value={t} key={t} onClick={(e) => {handleSizeChange(e)}}>{t}</MenuItem>       
                          )
                      })
                  }
                </Select>
              </FormControl>
            </div> 
        </CardContent>
        <CardActions className='btn-item'>
          <ItemCount stock={stock} onAdd={onAdd}/>
        </CardActions>
      </Card>
    </div>
  );
};

export default Item;