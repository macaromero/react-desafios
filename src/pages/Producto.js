import './Pages.css';
import { useParams } from "react-router-dom";
import ItemDetailContainer from "../components/ItemDetailContainer/ItemDetailContainer";

const Producto = () => {
    const id = parseInt(useParams().id);

    return(
        <main>
            <ItemDetailContainer id={id}/>
        </main>
    )
}

export default Producto;