import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import axios from 'axios';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrderPage } from './pages/OrderPage';
import { TrackingPage } from './pages/TrackingPage';
import { Page404 } from './pages/404';
import './App.css'

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await axios.get('/api/cart-items?expand=product');
      setCart(response.data);
    };
    fetchCartItems();
  }, []);

  return (
    <>
      <Routes>
        <Route
          index
          element={
            <HomePage
              cart={cart}
            />
          }
        />
        <Route
          path="checkout"
          element={
            <CheckoutPage
              cart={cart}
            />
          }
        />
        <Route
          path="orders"
          element={
            <OrderPage
              cart={cart}
            />
          }
        />
        <Route
          path="tracking/:orderId/:productId"
          element={
            <TrackingPage
              cart={cart}
            />
          }
        />
        <Route
          path="*"
          element={
            <Page404
              cart={cart}
            />
          }
        />
      </Routes>
    </>
  )
}

export default App