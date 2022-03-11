import * as React from 'react';
import './Navbar.css';
import logo from "../logo.png";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';




function Navbar() {
    const menu = (event) => {
        let menu = document.querySelector("#menu-navbar");
        if (menu.getAttribute("class") == "d-none") {
            menu.removeAttribute("class", "d-none")
        } else {
            menu.setAttribute("class", "d-none")
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
                        <IconButton size="large">
                                <ShoppingCartIcon />
                        </IconButton>
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
}

export default Navbar;



