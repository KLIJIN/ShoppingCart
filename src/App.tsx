import { useState, useEffect } from 'react';
// // Components
import Item from './item/item';
import Cart from './Cart/Cart';

import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
// Styles
import { Wrapper, StyledButton } from './App.styles';
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

const App: React.FC = () => {
const [isLoading, setisLoading] = useState<boolean>(false);
const [isError, setIsError] = useState<boolean>(false);
const [cartOpen, setCartOpen] = useState<boolean>(false);
const [data, setData] = useState([]);
const [cartItems, setCartItems] = useState([] as CartItemType[]);


  const getProducts = async (): Promise<CartItemType[]>  => {
    setisLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
        console.log("App__getProducts", data);
      setisLoading(false);
      setIsError(false);
      setData(data);
      return data;
    } catch (error) {
        console.log("Ошибка", error);
         setisLoading(false);
         setIsError(true)
         return error;
    }

  };
 
   useEffect(() => {
    getProducts();
  }, []);

 console.log("App1", data.length);
  console.log("App2", data);

  const getTotalItems = ( items: CartItemType[] ) => (
    items.reduce( (acc: number, item) => acc + item.amount, 0 )
  ) ;

  const handleAddToCart = (clickedItem: CartItemType) => {
     setCartItems( prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems( prev =>
       prev.reduce((acc, item) => {
      if (item.id === id) {
        if (item.amount === 1) return acc;
        return [...acc, { ...item, amount: item.amount - 1 }];
      } else {
        return [...acc, item];
      }
    }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress/>;
  if (isError) return <div> Something get whrong :/ </div>;
  
  return (
    <div className="App">
      <Wrapper>
        <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
              <Cart cartItems={cartItems} addToCart={   handleAddToCart   }  removeFromCart={   handleRemoveFromCart  }   />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)} style={  { position: "fixed",  zIndex: 100, right: "20px",   top: "20px",  }   }>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
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
