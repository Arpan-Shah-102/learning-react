import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { OrderElement } from '../components/OrderElement';
import './OrderPage.css';

export function OrderPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get('/api/orders?expand=products');
      setOrders(response.data);
    };
    fetchOrders();
  }, []);

  return (
    <>
      <title>Your Orders</title>
      <link rel="icon" type="image/svg+xml" href="https://supersimple.dev/images/orders-favicon.png" />

      <Header
        cart={cart}
      />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map(order => {
            return (
              <OrderElement
                order={order}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}