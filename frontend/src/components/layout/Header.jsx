import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useCartStore from '../../store/cartStore';

const Header = () => {
  const { userInfo, logout } = useAuthStore();
  const { cartItems } = useCartStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-editorial-canvas/80 backdrop-blur-md border-b border-editorial-gray/20">
      {/* Top Announcement Bar */}
      <div className="bg-editorial-noir text-white text-xs py-1.5 text-center tracking-widest uppercase">
        Complimentary Shipping on all orders over $500 • USD
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Left Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/shop" className="text-sm uppercase tracking-widest text-editorial-noir hover:text-editorial-crimson transition-colors">
              Shop
            </Link>
            <Link to="/shop?category=New" className="text-sm uppercase tracking-widest text-editorial-noir hover:text-editorial-crimson transition-colors">
              New Arrivals
            </Link>
            <Link to="/about" className="text-sm uppercase tracking-widest text-editorial-noir hover:text-editorial-crimson transition-colors">
              Brand
            </Link>
          </nav>

          {/* Center Logotype */}
          <div className="flex-shrink-0 flex items-center justify-center md:absolute md:left-1/2 md:-translate-x-1/2">
            <Link to="/" className="font-serif text-3xl font-semibold tracking-wide text-editorial-noir">
              ShopKart
            </Link>
          </div>

          {/* Right Utilities */}
          <div className="flex items-center space-x-6">
            <button className="text-editorial-noir hover:text-editorial-crimson transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            {userInfo ? (
              <div className="relative group">
                <button className="text-editorial-noir flex items-center space-x-1 hover:text-editorial-crimson transition-colors">
                  <User className="w-5 h-5" />
                </button>
                <div className="absolute right-0 w-48 mt-2 py-2 bg-white border border-editorial-gray/20 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <span className="block px-4 py-2 text-xs uppercase tracking-widest text-editorial-muted border-b border-editorial-gray/10">
                    {userInfo.name}
                  </span>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-editorial-noir hover:bg-editorial-canvas">
                    Profile & Orders
                  </Link>
                  {userInfo.isAdmin && (
                    <Link to="/admin" className="block px-4 py-2 text-sm text-editorial-noir hover:bg-editorial-canvas">
                      Admin Dashboard
                    </Link>
                  )}
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-editorial-noir hover:bg-editorial-canvas">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-editorial-noir hover:text-editorial-crimson transition-colors">
                <User className="w-5 h-5" />
              </Link>
            )}
            
            <Link to="/cart" className="text-editorial-noir hover:text-editorial-crimson transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-editorial-crimson text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
