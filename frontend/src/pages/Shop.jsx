import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const searchParams = new URLSearchParams(location.search);
        const keyword = searchParams.get('keyword') || '';
        const { data } = await axios.get(`/api/products?keyword=${keyword}`);
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [location]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="font-serif text-5xl text-editorial-noir mb-4">The Collection</h1>
        <div className="flex justify-center space-x-8 text-xs uppercase tracking-widest text-editorial-muted">
           <span className="cursor-pointer hover:text-editorial-noir transition-colors">Bags</span>
           <span className="cursor-pointer hover:text-editorial-noir transition-colors">Belts</span>
           <span className="cursor-pointer hover:text-editorial-noir transition-colors">Glasses</span>
           <span className="cursor-pointer hover:text-editorial-noir transition-colors">Scarves</span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-24 text-editorial-muted">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-24 text-editorial-muted">No products found.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-editorial-canvas mb-6">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-widest text-editorial-muted mb-2">{product.category}</p>
                <h3 className="text-sm font-semibold text-editorial-noir mb-2">{product.name}</h3>
                <p className="text-sm text-editorial-noir">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
