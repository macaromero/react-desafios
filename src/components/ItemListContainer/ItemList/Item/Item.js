import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import './Item.css';
import ItemCount from './ItemCount/ItemCount';


const Item = ({props}) => {

  const {imagen, imagenAlt, nombre, precio, stock} = props;

  const onAdd = (counter) => {
    if (counter <= stock) {
      console.log(`Se agregaron ${counter} ${nombre} al carrito`);
    }
  };

  
  return (
    <div>
      <Card className="cardItem">
        <div className='imgDiv-cardItem'>
          <div className='imgAnimation-cardItem'>          
            {imagen.map((img, i) => {
              return (
                <CardMedia
                component="img"
                alt={imagenAlt[i]}
                image={img}
                className="img-cardItem"
                key={img}
                />
              )
            })}
          </div> 
        </div>
        <CardContent className='cardContent-cardItem'>
            <div>
                <h2 className='price-cardItem'>${precio}</h2>
            </div>
            <div>
                <h1 className='title-cardItem'>{nombre}</h1>
            </div>
            <div>
                <p className='description-cardItem'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore asperiores culpa possimus consequatur.</p>
            </div>
        </CardContent>
        <CardActions className='btn-cardItem'>
          <ItemCount stock={stock} initial = "1" onAdd={onAdd}/>
        </CardActions>
      </Card>
    </div>
  );
};

export default Item;