import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useCartStore();
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-5xl text-editorial-noir mb-12 border-b border-editorial-gray/20 pb-8">Your Bag</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-editorial-muted mb-8 text-lg">Your bag is currently empty.</p>
          <Link to="/shop" className="btn-primary">Return to Shop</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <div key={item.product} className="flex items-center py-8 border-b border-editorial-gray/10">
                <div className="w-24 h-32 bg-editorial-canvas flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="ml-8 flex-grow">
                  <Link to={`/product/${item.product}`} className="font-serif text-xl text-editorial-noir hover:text-editorial-crimson transition-colors block mb-2">
                    {item.name}
                  </Link>
                  <p className="text-sm text-editorial-muted mb-4">${item.price.toFixed(2)}</p>
                  <div className="flex items-center justify-between">
                    <select 
                      value={item.qty} 
                      onChange={(e) => addToCart({ ...item, qty: Number(e.target.value) })}
                      className="bg-transparent border-none text-editorial-noir font-serif focus:ring-0 cursor-pointer"
                    >
                      {[...Array(10).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      ))}
                    </select>
                    <button 
                      onClick={() => removeFromCart(item.product)}
                      className="text-xs uppercase tracking-widest text-editorial-muted hover:text-editorial-crimson transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <div className="bg-editorial-canvas p-8">
              <h2 className="font-serif text-2xl text-editorial-noir mb-8 border-b border-editorial-gray/20 pb-4">Order Summary</h2>
              
              <div className="flex justify-between mb-4 text-sm text-editorial-noir">
                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                <span>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between mb-8 text-sm text-editorial-noir">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>

              <div className="flex justify-between mb-12 text-lg font-serif text-editorial-noir border-t border-editorial-gray/20 pt-4">
                <span>Total</span>
                <span>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
              </div>

              <button 
                onClick={checkoutHandler}
                className="btn-primary w-full"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
