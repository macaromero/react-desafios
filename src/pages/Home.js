import './Pages.css';
import ItemListContainer from "../components/ItemListContainer/ItemListContainer";

const Home = () => {
    return (
        <main>
            <div>
                <h1>Esta es la home</h1>
                <ItemListContainer cat_id={null}/>
            </div>
        </main>
    )
}

export default Home;