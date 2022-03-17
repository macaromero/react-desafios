import * as React from 'react';
import './Navbar.css';
import logo from "../../images/logo.png";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import CartWidget from './CartWidget/CartWidget';



const Navbar = () => {
    let menuStatus = false;
    const menu = (event) => {
        let menu = document.querySelector("#menu-navbar");
        if (menuStatus == false) {
            menu.removeAttribute("class", "d-none");
            menuStatus = true;
        } else {
            menu.setAttribute("class", "d-none");
            menuStatus = false;
        }
    };
    
    return (
        <Box className='box-navbar'>
            <AppBar position="static">
                <Toolbar className='navbar'>
                    <div className='logoMenu-navbar'>
                        <IconButton
                        id='logoMenu-navbar'
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={menu}                        
                        >
                            <MenuIcon />
                        </IconButton>
                        <div className='d-none' id='menu-navbar'>
                            <MenuList className='listaMenu-navbar'>
                                <MenuItem>Productos</MenuItem>
                                <MenuItem>Sobre nosotros</MenuItem>
                                <MenuItem>Contacto</MenuItem>
                            </MenuList>
                        </div>
                        <img src={logo} className="logo-navbar"/>
                    </div>
                    <div className='logoMenu-navbar'>
                        <CartWidget/>
                    </div>
                    <div className='logoMenu-navbar'>
                        <IconButton size="large">
                                <PersonIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;



