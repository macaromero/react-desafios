import { useState, useEffect, useContext } from 'react';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Button from '@mui/material/Button';
import ItemDetail from './ItemDetail/ItemDetail';
import './ItemDetailContainer.css';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { doc, getDoc } from "firebase/firestore";
import db from '../../firebase';
import CategoriesContext from '../../context/CategoriesContext';


const ItemDetailContainer = ({id}) => {
    const {getCategories, categories, setCat} = useContext(CategoriesContext);
    const [product, setProduct] = useState({});
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {  
        getCategories()  
        setCat(id, categories) 
    }, []);

    useEffect(() => {
        getProduct()
        setCat(id, categories)
    }, [id]);


    const handleCatClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigateToCat = (id_cat) => {
        setAnchorEl(null);
        navigate(`/categories/${id_cat}`);
    };

    const getProduct = async () => {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let producto = docSnap.data();
            producto.id = docSnap.id;
            return setProduct(producto)
        } else {
            navigate('/error')
        }
    }

    const backToProducts = () => {
        navigate(`/products`);
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