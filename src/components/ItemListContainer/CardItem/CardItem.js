import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import './CardItem.css';
import ItemCount from './ItemCount/ItemCount';
 
const CardItem = ({imgUrl, imgAlt, title, price, stock, counter}) => {

  const onAdd = (counter) => {
    if (counter <= stock) {
      console.log(`Se agregaron ${counter} ${title} al carrito`);
    }
  }

  return (
    <Card className="cardItem">
      <CardMedia
        component="img"
        alt={imgAlt}
        height="140"
        image={imgUrl}
        className="img-cardItem"
      />
      <CardContent className='cardContent-cardItem'>
          <div>
              <h1>{title}</h1>
          </div>
          <div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore asperiores culpa possimus consequatur.</p>
          </div>
          <div>
              <h2>${price}</h2>
          </div>
      </CardContent>
      <CardActions className='btn-cardItem'>
        <ItemCount stock={stock} initial = "1" onAdd={onAdd}/>
      </CardActions>
    </Card>
  );
};

export default CardItem;