import { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckoutHeader } from './CheckoutHeader';
import { CartItem } from './CartItem';
import { formatMoney } from '../../utils/money';
import './CheckoutPage.css';

export function CheckoutPage({ cart }) {
  const [deliveryOption, setDeliveryOption] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const deliveryResponse = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
      setDeliveryOption(deliveryResponse.data);

      const paymentResponse = await axios.get('/api/payment-summary');
      setPaymentSummary(paymentResponse.data);
    };
    fetchData();
  }, [cart]);

  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="https://supersimple.dev/images/cart-favicon.png" />

      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">

            {cart.map(item => (
              <CartItem
                key={item.id}
                item={item}
                deliveryOption={deliveryOption}
              />
            ))}
          </div>

          {paymentSummary && (
            <div className="payment-summary">
              <div className="payment-summary-title">
                Payment Summary
              </div>

              <div className="payment-summary-row">
                <div>Items ({paymentSummary.totalItems}):</div>
                <div className="payment-summary-money">{formatMoney(paymentSummary.productCostCents)}</div>
              </div>

              <div className="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div className="payment-summary-money">{formatMoney(paymentSummary.shippingCostCents)}</div>
              </div>

              <div className="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
              </div>

              <div className="payment-summary-row">
                <div>Estimated tax:</div>
                <div className="payment-summary-money">{formatMoney(paymentSummary.taxCents)}</div>
              </div>

              <div className="payment-summary-row total-row">
                <div>Order total:</div>
                <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostCents)}</div>
              </div>

              <button className="place-order-button button-primary">
                Place your order
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}