import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data.slice(0, 4)); // Show only top 4 featured
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative h-[85vh] w-full bg-editorial-noir flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
          alt="Editorial Fashion" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 transform origin-center transition-transform duration-[10s] hover:scale-100"
        />
        <div className="relative z-10 text-center px-4">
          <p className="font-script text-3xl md:text-5xl text-editorial-canvas mb-4 -rotate-2">there she rose</p>
          <h1 className="font-serif text-5xl md:text-8xl text-editorial-canvas mb-12 tracking-tight">AUTUMN EDITION</h1>
          <Link to="/shop" className="btn-outline bg-transparent border-editorial-canvas text-editorial-canvas hover:bg-editorial-canvas hover:text-editorial-noir">
            Explore the collection
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-editorial-noir mb-4">Curated Selection</h2>
          <p className="text-editorial-muted max-w-2xl mx-auto">Discover the iconic pieces that define the season's aesthetic.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-editorial-canvas mb-6">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                   <button className="bg-white text-editorial-noir px-6 py-2 uppercase tracking-widest text-[10px] font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                     Quick View
                   </button>
                </div>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-widest text-editorial-muted mb-2">{product.category}</p>
                <h3 className="text-sm font-semibold text-editorial-noir mb-2">{product.name}</h3>
                <p className="text-sm text-editorial-noir">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/shop" className="btn-outline">
            View All Products
          </Link>
        </div>
      </section>

      {/* Storytelling Module */}
      <section className="bg-editorial-noir text-editorial-canvas py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square overflow-hidden rounded-full">
            <img 
              src="https://images.unsplash.com/photo-1550614000-4b95d466f20d?q=80&w=800&auto=format&fit=crop" 
              alt="Season of Grace" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-serif text-5xl mb-8">Season of Grace</h2>
            <p className="text-editorial-gray text-lg leading-relaxed mb-10">
              Our latest collection draws inspiration from the enduring elegance of Parisian architecture and the subtle transition of seasons. Each piece is crafted with meticulous attention to detail, designed to be cherished for generations.
            </p>
            <Link to="/about" className="btn-outline border-editorial-gray text-editorial-canvas hover:bg-editorial-canvas hover:text-editorial-noir hover:border-editorial-canvas">
              Discover Our Philosophy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
