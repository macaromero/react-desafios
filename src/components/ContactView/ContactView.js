import './ContactView.css';
import TextField from '@mui/material/TextField';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Button } from '@mui/material';

const ContactView = () => {
    return (
                        
        <div className='container-contactView'>
            <div className="row-contactView">
                <h3 className="title-contactView">Contactanos</h3>
            </div>
            <div className="row-contactView spaceAround-contactView">
                <div className="col-contactView">
                    <form>
                        <div className="row-contactView">
                            <TextField label="Nombre" name="name" required fullWidth/>
                        </div>
                        <div className="row-contactView">
                            <TextField label="Teléfono" name="phone" required fullWidth/>
                        </div>
                        <div className="row-contactView">
                            <TextField label="Correo electrónico" name="email" type='email' required fullWidth/>
                        </div>
                        <div className="row-contactView">
                            <TextField label="Mensaje" name="message" required fullWidth/>
                        </div>
                        <div>
                            <Button type='submit' id='btnSend-contactView' size='small'>Enviar</Button>
                        </div>
                    </form>
                </div>
                <div className="col-contactView socialMedia-contactView">
                    <div>
                        <Button id='btnWapp-contactView' size='large' startIcon={<WhatsAppIcon />}>
                            +54 9 11 1234 5678
                        </Button>
                    </div>
                    <div>
                        <Button id="btnIg-contactView" size='large' startIcon={<InstagramIcon />}>
                            @mechacalzados
                        </Button>
                    </div>
                </div>
            </div> 
        </div>
    )
}


export default ContactView;