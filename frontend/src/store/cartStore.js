import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {},
  paymentMethod: localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : 'PayPal',

  addToCart: (item) => {
    const itemExists = get().cartItems.find((x) => x.product === item.product);

    if (itemExists) {
      set((state) => ({
        cartItems: state.cartItems.map((x) =>
          x.product === itemExists.product ? item : x
        ),
      }));
    } else {
      set((state) => ({
        cartItems: [...state.cartItems, item],
      }));
    }
    localStorage.setItem('cartItems', JSON.stringify(get().cartItems));
  },
  
  removeFromCart: (id) => {
    set((state) => ({
      cartItems: state.cartItems.filter((x) => x.product !== id),
    }));
    localStorage.setItem('cartItems', JSON.stringify(get().cartItems));
  },

  saveShippingAddress: (data) => {
    set({ shippingAddress: data });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  },

  savePaymentMethod: (data) => {
    set({ paymentMethod: data });
    localStorage.setItem('paymentMethod', JSON.stringify(data));
  },
  
  clearCartItems: () => {
    set({ cartItems: [] });
    localStorage.removeItem('cartItems');
  }
}));

export default useCartStore;
