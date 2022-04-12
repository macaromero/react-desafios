import {useState, useContext} from 'react';
import './Navbar.css';
import logoMecha from '../../images/logo.png'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import CartWidget from './CartWidget/CartWidget';
import { Button, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


const Navbar = () => {
    const {isCartEmpty} = useContext(CartContext);
    const navigate = useNavigate();
    
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const navigateHome = () => {
        navigate('/');
    };

    const categorias = [
        {
            id_categoria: 1,
            categoria: "Botas"
        },
        {
            id_categoria: 2,
            categoria: "Ojotas"
        },
        {
            id_categoria: 3,
            categoria: "Sandalias"
        },
        {
            id_categoria: 4,
            categoria: "Zapatillas"
        },
    ]
    
    return (
        <header>
            <Box className='box-navbar'>
                <AppBar position="fixed">
                    <Toolbar className='navbar'>
                        <div className='logoMecha-navbar'>
                            <img src={logoMecha} className="logo-navbar" alt='Logo Mecha Calzados' onClick={navigateHome}/>
                        </div>
                        <div className='links-navbar'>
                            <ul id='ul-navbar'>
                                <li>
                                    <Button>
                                        <Link to={"/"}>Home</Link>
                                    </Button>
                                </li>
                                <li>
                                    <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    className="btnPproductos-navbar"
                                    >
                                    Productos
                                    </Button>
                                    <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                    className="menuProductos-navbar"
                                    >
                                        {
                                            categorias.map(c => {
                                                return (
                                                    <MenuItem onClick={handleClose} key={c.id_categoria}>
                                                        <Link to={`/categorias/${c.id_categoria}`}><ArrowRightIcon className='flechaProductos-navbar'/>{c.categoria}</Link>
                                                    </MenuItem>
                                                );
                                            })
                                        }
                                        <Divider></Divider>
                                        <MenuItem onClick={handleClose} className="liProductos-navbar">
                                            <Link to="/productos">Ver todos</Link>
                                        </MenuItem>
                                    </Menu>
                                </li>
                                <li>
                                    <Button>
                                        <Link to={"/nosotros"}>Nosotros</Link>
                                    </Button>
                                </li>
                                <li>
                                    <Button>
                                        <Link to={"/contacto"}>Contacto</Link>
                                    </Button>
                                </li>
                            </ul>
                        </div>
                        <div className='logosCart-navbar'>
                            {
                                !isCartEmpty && 
                                    <div className='logosUserCart-navbar'>
                                        <CartWidget/>
                                    </div>
                            }
                            
                            <div className='logosUserCart-navbar'>
                                <IconButton size="large">
                                        <PersonIcon />
                                </IconButton>
                            </div>
                        </div> 
                    </Toolbar>
                </AppBar>
            </Box>
        </header>
    );
};

export default Navbar;