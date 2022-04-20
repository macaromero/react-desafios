import './ItemListContainer.css';
import { useEffect, useState, useContext } from 'react';
import ItemList from './ItemList/ItemList';
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useNavigate } from 'react-router-dom';
import CategoriesContext from '../../context/CategoriesContext';


const ItemListContainer = ({cat_id}) => {
    const {getCategories, categories, category, setCat} = useContext(CategoriesContext);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        getCategories();
        setCat(cat_id, categories);
    }, [])

    useEffect(() => {
        setCat(cat_id, categories)
    }, [cat_id])


    const handleCatClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigateToCat = (id) => {
        setAnchorEl(null);
        navigate(`/categories/${id}`);
    };

    const backToProducts = () => {
        navigate(`/products`);
    };


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
                    >
                        <ArrowRightIcon/> {category}
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
                                if (category !== c.categoria) {
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
            <ItemList id_cat={cat_id}/>
        </div>  
    );
};

export default ItemListContainer;