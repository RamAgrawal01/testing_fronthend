import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/v1/product');
        console.log(response);

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('Fetched data is not in the expected format');
        }

        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div>
      {error && <div>Error: {error}</div>}
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Weight: {product.weight}</p>
            <p>Metal: {product.metal}</p>
            <p>Price: {product.price}</p>
            <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '100px' }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;