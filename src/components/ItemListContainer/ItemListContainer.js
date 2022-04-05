import './ItemListContainer.css';
import { useEffect, useState } from 'react';
import ItemList from './ItemList/ItemList';
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useNavigate } from 'react-router-dom';
import getCategories from '../../services/categories.service';


const ItemListContainer = ({cat_id}) => {
    const [idCatActual, setIdCatActual] = useState();

    useEffect(() => {
        setIdCatActual(cat_id)
    }, [cat_id])

    const [categories, setCategories] = useState([]);
    const [cat_actual, setCat_actual] = useState()
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    const handleCatClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigateToCat = (id) => {
        setAnchorEl(null);
        navigate(`/categorias/${id}`);
    };

    const backToProducts = () => {
        navigate(`/productos`);
    };


    const getCategoria = () => {
        return categories.map((c) => {
            if (c.id_categoria === idCatActual) {
                setCat_actual(c.categoria);
            } else if (idCatActual === null) {
                setCat_actual("Categorías")
            }
            return cat_actual;
        });
    };

    useEffect(() => {
        getCategories().then(data => {
            setCategories(data)
        }).catch((e) => {
            console.log(e)
        });
    }, [])

    useEffect(() => {
        getCategoria();
    }, [cat_id, idCatActual, cat_actual]);


    return(
        <div className="container-itemDetailContainer">
            <div className='row-itemDetailContainer'>
                <Button className='btn-itemDetailContainer' onClick={backToProducts}><ArrowLeftIcon/> Ver todos</Button>
                <div>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleCatClick}
                        className='btn-itemDetailContainer'
                        key={idCatActual}
                    >
                        <ArrowRightIcon/> {cat_actual}
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
                                if (idCatActual !== c.id_categoria) {
                                    return (
                                        <MenuItem onClick={() => navigateToCat(c.id_categoria)} key={c.id_categoria} className='btn-itemDetailContainer'><ArrowRightIcon/> {c.categoria}</MenuItem>
                                    )
                                }
                            }
                            return result()
                        })}
                    </Menu>
                </div>
            </div>
            <ItemList id_cat={idCatActual}/>
        </div>  
    );
};

export default ItemListContainer;