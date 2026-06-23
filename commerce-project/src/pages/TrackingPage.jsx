import { Link } from 'react-router';
import { Header } from '../components/Header';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './TrackingPage.css';

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchTrackingInfo = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    };
    fetchTrackingInfo();
  }, [orderId]);
  if (!order) {return null;}

  const orderProduct = order && order.products.find((p) => p.productId === productId);

  const productTimeMs = orderProduct && orderProduct.estimatedDeliveryTimeMs - (order && order.orderTimeMs);
  const timePassedMS = dayjs().valueOf() - (order && order.orderTimeMs);
  const progressPercentage = productTimeMs ? Math.min((timePassedMS / productTimeMs) * 100, 100) : 0;

  const [isPreparing, isShipped, isDelivered] = [
    progressPercentage < 33,
    progressPercentage >= 33 && progressPercentage < 66,
    progressPercentage >= 66,
  ];

  return (
    <>
      <title>Track Package</title>
      <link rel="icon" type="image/svg+xml" href="https://supersimple.dev/images/tracking-favicon.png" />

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {progressPercentage >= 100 ? 'Delivered' : 'Arriving'} on<br />
            {dayjs(orderProduct && orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {orderProduct && orderProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {orderProduct && orderProduct.quantity}
          </div>

          <img className="product-image" src={orderProduct && orderProduct.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing ? 'current-status' : ''}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipped ? 'current-status' : ''}`}>
              Shipped
            </div>
            <div className={`progress-label ${isDelivered ? 'current-status' : ''}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}