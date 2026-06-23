import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import './CartItem.css';

export function CartItem({ item, deliveryOption }) {  
  const selectedDeliveryOption = deliveryOption.find(
    option => option.id === item.deliveryOptionId
  );
  return (
    <>
      <div key={item.productId} className="cart-item-container">
        <div className="delivery-date">
          Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
        </div>

        <div className="cart-item-details-grid">
          <img className="product-image"
            src={item.product.image} />

          <div className="cart-item-details">
            <div className="product-name">
              {item.product.name}
            </div>
            <div className="product-price">
              {formatMoney(item.product.priceCents)}
            </div>
            <div className="product-quantity">
              <span>
                Quantity: <span className="quantity-label">{item.quantity}</span>
              </span>
              <span className="update-quantity-link link-primary">
                Update
              </span>
              <span className="delete-quantity-link link-primary">
                Delete
              </span>
            </div>
          </div>

          <div className="delivery-options">
            <div className="delivery-options-title">
              Choose a delivery option:
            </div>

            {deliveryOption.map(option => {
              return (
                <div key={option.id} className="delivery-option">
                  <input type="radio"
                    checked={item.deliveryOptionId === option.id}
                    className="delivery-option-input"
                    name={`delivery-option-${item.productId}`} />
                  <div>
                    <div className="delivery-option-date">
                      {dayjs(option.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                    </div>
                    <div className="delivery-option-price">
                      {option.priceCents === 0 ? 'FREE Shipping' : `${formatMoney(option.priceCents)} - Shipping`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}