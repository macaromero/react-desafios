import { Button } from "@mui/material";
import './NotFoundView.css';
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/')
    }
    return (
        <div className="container-notFound">
            <div className="row-notFound">
                <h2 className="title-notFound">.404</h2>
            </div>
            <div className="row-notFound">
                <h3 className="subtitle-notFound">No encontramos la página que estás buscando</h3>
            </div>
            <div className="row-notFound">
                <Button id='btn-notFound' onClick={navigateHome}>Volvé al inicio</Button>
            </div>
        </div>
    )
}

export default NotFound;