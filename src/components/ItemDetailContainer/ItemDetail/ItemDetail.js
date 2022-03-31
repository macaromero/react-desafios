import './ItemDetail.css';
import {useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import ItemCount from '../../ItemListContainer/ItemList/Item/ItemCount/ItemCount';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Button } from '@mui/material';

const ItemDetail = ({props}) => {

    const imagen = props.imagen || [];
    const color = props.color || [];
    const {nombre, imagenAlt, precio, stock} = props;

    const [colour, setColour] = useState('');
    const [positionCarousel, setPositionCarousel] = useState(0)

    const handleChange = (event) => {
        setColour(event.target.value);
    };

    const onAdd = (counter) => {
        if (counter <= stock) {
          console.log(`Se agregaron ${counter} ${nombre} al carrito`);
        }
    };

    const moveLeft = () => {
        if (positionCarousel < 0) {
            setPositionCarousel(positionCarousel + 426.217);
        }  
    }

    const moveRight = () => {
        if (positionCarousel > -1278.65) {
            setPositionCarousel(positionCarousel - 426.217);
        } 
    }

    const style = {"transform": `translateX(${positionCarousel}px)`};

    return(
        <div className="container-itemDetail">
            <div className="row-itemDetail">
                <h1 className='title-itemDetail'>{nombre}</h1>
            </div>
            <div className="row-itemDetail">
                <div className="col-itemDetail">
                    <div className='rowBtn-itemDetail'>
                        <Button className="button-itemDetail" onClick={moveLeft}><ArrowLeftIcon/></Button> 
                        <Button className="button-itemDetail" onClick={moveRight}><ArrowRightIcon/></Button> 
                    </div>
                    <div className='imgDiv-itemDetail'>
                        <div className='imgAnimation-itemDetail' style={style}>
                            {imagen.map((img, i) => {
                                return (
                                    <img
                                    alt={imagenAlt[i]}
                                    src={img}
                                    className="img-itemDetail"
                                    key={img}
                                    />
                                )
                                })
                            }
                        </div>
                    </div>
                </div>
                <Divider orientation="vertical" flexItem className='divider-itemDetail'></Divider>
                <div className="col-itemDetail">
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Color</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={colour}
                            label="Color"
                            onChange={handleChange}
                            >
                                {color.map(c => {
                                    return(
                                        <MenuItem key={c} value={c} className="itemSelect-itemDetail">{c}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <div className='price-itemDetail'>
                        <h2 className='priceText-itemDetail'>${precio}</h2>
                        <ItemCount stock={stock} initial={1} onAdd={onAdd} />
                    </div>
                    
                </div>
            </div>
            <div className="row-itemDetail">
                <p className='description-itemDetail'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos reiciendis doloremque dolorum et odio voluptatibus fugit nisi qui consectetur minus ad corrupti pariatur, possimus iure quis aperiam, rem, ipsa iusto?
                    Nam distinctio cumque laboriosam illum pariatur asperiores labore quisquam, ratione perspiciatis rerum reprehenderit quo possimus quas hic, beatae minima dicta, voluptatem aut? Provident porro voluptatem accusamus obcaecati, vitae blanditiis dolor.
                    Soluta earum rerum dolorum, dolor fuga, iusto ipsum incidunt officia, exercitationem aliquid voluptatibus! Quam, officia voluptatum exercitationem nam quibusdam repudiandae impedit quidem odio possimus nostrum, maiores laboriosam consectetur nemo. Quo.
                    Nesciunt, accusantium. Facilis numquam blanditiis, nostrum harum esse voluptatibus cumque nisi soluta explicabo iusto libero expedita officiis nam perspiciatis corrupti beatae consequuntur atque nesciunt et distinctio odit excepturi ipsum. Velit?
                    Dolores, recusandae! Porro non ab, illo quo possimus tempore cupiditate dicta nobis modi sapiente neque quia nesciunt doloribus commodi minus dolore reprehenderit exercitationem culpa molestias ullam earum ipsam! Recusandae, vel!
                </p>
            </div>
        </div>
    );
    
};

export default ItemDetail;


    