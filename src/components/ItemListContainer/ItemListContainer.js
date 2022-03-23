import './ItemListContainer.css';
import CardItem from './CardItem/CardItem'
import sandaliaCamel from '../../images/products/sandalia-eva-camel.jpg';
import zapatillaRoja from '../../images/products/zapatilla-sophia-roja.jpg';
import botaVerde from '../../images/products/bota-chavito-verde.jpg';


const ItemListContainer = () => {
    return(
        <div className="container-ItemListContainer">
            <div className="row-ItemListContainer">
                <div className="col-ItemListContainer">
                    <CardItem
                        imgUrl={sandaliaCamel} 
                        imgAlt="Sandalia camel"
                        title="Sandalia Eva"
                        price="3.100"
                        stock="4"
                    />
                </div>
                <div className="col-ItemListContainer">
                    <CardItem
                        imgUrl={zapatillaRoja} 
                        imgAlt="Zapatilla roja"
                        title="Zapatilla Sophia"
                        price="3.800"
                        stock="10"
                    />
                </div>
                <div className="col-ItemListContainer">
                    <CardItem
                        imgUrl={botaVerde} 
                        imgAlt="Bota verde"
                        title="Bota Chavito"
                        price="4.500"
                        stock="7"
                    />
                </div>
            </div>
        </div>
        
    );
};

export default ItemListContainer;