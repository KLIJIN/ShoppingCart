import { useState, useEffect } from 'react';
// import { useQuery } from 'react-query';
// // Components
  import Item from './item/item';
// import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
// Styles
import { Wrapper } from './App.styles';
// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const url = "https://fakestoreapi.com/products"

const App = () => {
const [isLoading, setisLoading] = useState(false);
const [isError, setIsError] = useState(false);
const [data, setData] = useState([]);
const [cartOpen, setCartOpen] = useState([]);

  const getProducts = async (): Promise<CartItemType[]>  => {
    setisLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setisLoading(false);
      setIsError(false);
      setData(data);
      return data;
    } catch (error) {
        console.log(error);
         setisLoading(false);
         setIsError(true)
         return error;
    }

  };
 
   useEffect(() => {
    getProducts();
  }, []);

 console.log("App", data.length);

  const getTotalItems = () => null;
  const handleAddToCart = (clickedItem: CartItemType) => null;
  const getRemoveFromCart = () => null;

  
  if (isLoading) return <LinearProgress/>;
  if (isError) return <div> Something get whrong :/ </div>;

  
  return (
    <div className="App">
      Раз. Два. Погнали!
      <Wrapper>
        <Grid container spacing={3}>
          {
         data?.length > 0 && data?.map( (item:CartItemType)  => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={ handleAddToCart} ></Item>
            </Grid>
          ) )  
          }
        </Grid>
      </Wrapper>

    </div>
  );

}

export default App;
