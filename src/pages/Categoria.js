import './Pages.css';
import { useParams } from "react-router-dom";
import ItemListContainer from "../components/ItemListContainer/ItemListContainer";

const Categoria = () => {
    const id = parseInt(useParams().id_cat)

    return(
        <main>
            <ItemListContainer cat_id={id}/>
        </main>
    )
};

export default Categoria;