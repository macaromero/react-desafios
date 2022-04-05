import { useState, useEffect } from 'react';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Button from '@mui/material/Button';
import {getProductById} from '../../services/products.service';
import getCategories from '../../services/categories.service';
import ItemDetail from './ItemDetail/ItemDetail';
import './ItemDetailContainer.css';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const ItemDetailContainer = ({id}) => {
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([])
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleCatClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigateToCat = (id_cat) => {
        setAnchorEl(null);
        navigate(`/categorias/${id_cat}`);
    };

    useEffect(() => {
        getProductById(id).then(data => {
            setProduct(data)
        }).catch((e) => {
            console.log(e)
        });  
    }, [id]);

    useEffect(() => {  
        getCategories().then(data => {
            setCategories(data)
        }).catch((e) => {
            console.log(e)
        });    
    }, []);

    const backToProducts = () => {
        navigate(`/productos`);
    };

    return(
        <div className="container-itemDetailContainer">
            <div className='row-itemDetailContainer'>
                <Button className='btn-itemDetailContainer' onClick={backToProducts}><ArrowLeftIcon/> Volver</Button>
                <div>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleCatClick}
                        className='btn-itemDetailContainer'
                        key={product.id_categoria}
                    >
                        <ArrowRightIcon/> {product.categoria}
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        {categories.map((c) => {
                            const result = () => {
                                if (product.categoria !== c.categoria) {
                                    return (
                                        <MenuItem onClick={() => navigateToCat(c.id_categoria)} key={c.id_categoria} className='btn-itemDetailContainer'>
                                            <ArrowRightIcon/> {c.categoria}
                                        </MenuItem>
                                    )
                                }
                            }
                            return result()
                        })}
                    </Menu>
                </div>
            </div>
            <div className='row-itemDetailContainer'>
                <ItemDetail props={product}/>
            </div>
        </div>
    );
};

export default ItemDetailContainer;