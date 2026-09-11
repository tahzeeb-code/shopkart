import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-editorial-canvas border-t border-editorial-gray/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 border-b border-editorial-gray/20 text-center md:text-left">
          <div>
            <h4 className="font-serif text-xl mb-3 text-editorial-noir">Complimentary Shipping</h4>
            <p className="text-sm text-editorial-muted">Enjoy free express delivery on all orders above $500.</p>
          </div>
          <div>
            <h4 className="font-serif text-xl mb-3 text-editorial-noir">Complimentary Returns</h4>
            <p className="text-sm text-editorial-muted">Return any unworn item within 30 days of delivery.</p>
          </div>
          <div>
            <h4 className="font-serif text-xl mb-3 text-editorial-noir">Client Services</h4>
            <p className="text-sm text-editorial-muted">Our dedicated advisors are available 24/7 to assist you.</p>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-16">
          <div className="md:col-span-1">
            <Link to="/" className="font-serif text-3xl font-semibold tracking-wide text-editorial-noir block mb-6">
              ShopKart
            </Link>
          </div>
          <div>
            <h5 className="uppercase tracking-widest text-xs font-semibold mb-6 text-editorial-noir">The House</h5>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-sm text-editorial-muted hover:text-editorial-crimson transition-colors">About Us</Link></li>
              <li><Link to="/sustainability" className="text-sm text-editorial-muted hover:text-editorial-crimson transition-colors">Sustainability</Link></li>
              <li><Link to="/careers" className="text-sm text-editorial-muted hover:text-editorial-crimson transition-colors">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="uppercase tracking-widest text-xs font-semibold mb-6 text-editorial-noir">Client Services</h5>
            <ul className="space-y-4">
              <li><Link to="/contact" className="text-sm text-editorial-muted hover:text-editorial-crimson transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="text-sm text-editorial-muted hover:text-editorial-crimson transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="text-sm text-editorial-muted hover:text-editorial-crimson transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="uppercase tracking-widest text-xs font-semibold mb-6 text-editorial-noir">Newsletter</h5>
            <p className="text-sm text-editorial-muted mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex">
              <input type="email" placeholder="ENTER YOUR EMAIL" className="input-field w-full" />
              <button type="submit" className="text-editorial-noir uppercase tracking-widest text-xs font-semibold hover:text-editorial-crimson ml-4 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-editorial-gray/20">
          <p className="text-xs text-editorial-muted uppercase tracking-wider mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ShopKart. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-xs text-editorial-muted hover:text-editorial-crimson uppercase tracking-wider transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-editorial-muted hover:text-editorial-crimson uppercase tracking-wider transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
