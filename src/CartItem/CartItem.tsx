import Button from "@material-ui/core/Button";
import {Wrapper} from "./CartItem.style";
import {CartItemType} from "../App"

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
}

const CartItem: React.FC<Props> = ({item, addToCart, removeFromCart}) => {
  const  { id, title,  price, amount, image} = item;
  return <Wrapper>
    <div>
      <h3>{title}</h3>
      <div className="information">
        <p> Price: ${price} </p>
        <p> Total: ${amount * price}.toFixed(2) </p>
      </div>
      <div className="buttons">
        <Button size="small" disableElevation  variant="contained" onClick={() => removeFromCart(id)}  > -  </Button>
              {amount}
        <Button size="small" disableElevation  variant="contained" onClick={() => addToCart(item) }  > +  </Button>
      </div>
    </div>
    <img src={image} alt={title} />
  </Wrapper>
}


export default CartItem;