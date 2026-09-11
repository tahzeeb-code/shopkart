import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useCartStore from '../store/cartStore';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    addToCart({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      qty,
    });
    navigate('/cart');
  };

  if (loading) return <div className="text-center py-24">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={() => navigate(-1)} className="text-xs uppercase tracking-widest text-editorial-muted hover:text-editorial-noir mb-12 flex items-center">
        ← Back to Collection
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="aspect-[3/4] bg-editorial-canvas overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-widest text-editorial-muted mb-4">{product.category}</p>
          <h1 className="font-serif text-4xl text-editorial-noir mb-6">{product.name}</h1>
          <p className="text-xl text-editorial-noir mb-8">${product.price?.toFixed(2)}</p>
          
          <div className="prose prose-sm text-editorial-gray mb-12">
            <p>{product.description}</p>
          </div>

          <div className="border-t border-b border-editorial-gray/20 py-6 mb-8 flex items-center justify-between">
            <span className="text-sm uppercase tracking-widest text-editorial-noir font-semibold">Quantity</span>
            {product.stock > 0 ? (
              <select 
                value={qty} 
                onChange={(e) => setQty(Number(e.target.value))}
                className="bg-transparent border-none focus:ring-0 text-editorial-noir font-serif text-lg cursor-pointer"
              >
                {[...Array(product.stock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>{x + 1}</option>
                ))}
              </select>
            ) : (
              <span className="text-sm text-editorial-crimson uppercase tracking-widest">Out of Stock</span>
            )}
          </div>

          <button 
            onClick={addToCartHandler}
            disabled={product.stock === 0}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
