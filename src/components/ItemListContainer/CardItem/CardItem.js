import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import './CardItem.css';

const CardItem = ({imgUrl, imgAlt, title, price}) => {
  return (
    <Card className="cardItem">
      <CardMedia
        component="img"
        alt={imgAlt}
        height="140"
        image={imgUrl}
        className="img-cardItem"
      />
      <CardContent>
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
        <Button size="large">Agregar al carrito</Button>
      </CardActions>
    </Card>
  );
};

export default CardItem;