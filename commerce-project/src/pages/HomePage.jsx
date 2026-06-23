import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { ProductContainer } from '../components/ProductContainer';
import './HomePage.css';

export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    };
    getProducts();
  }, []);

  return (
    <>
      <title>Ecommerce</title>
      <link rel="icon" type="image/svg+xml" href="https://supersimple.dev/images/home-favicon.png" />

      <Header
        cart={cart}
      />

      <div className="home-page">
        <div className="products-grid">
          {products.map(product => {
            return (
              <ProductContainer
                id={product.id}
                image={product.image}
                name={product.name}
                rating={product.rating}
                priceCents={product.priceCents}
                keywords={product.keywords}
              />
            );
          })};
        </div>
      </div>
    </>
  );
}