  import {FC} from "react"
import Button from "@material-ui/core/Button"
import {Wrapper} from "./item.styles"
import { CartItemType} from "../App"

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
}

const Item: FC<Props> = ({item, handleAddToCart}) =>  {
  const {image, title, description, price} = item;
  
  return <Wrapper>
    <img src={image} alt={title} />
    <div>
      <h3>{title}</h3>
      <p>{description}</p> 
      <h3>${price}</h3>
    </div>
    <Button onClick ={ ()=> handleAddToCart(item)}> Add to cart </Button>
  </Wrapper>
}
export default Item;