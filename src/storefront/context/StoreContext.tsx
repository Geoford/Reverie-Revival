import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorefrontProduct, getVariantPrice } from '../data/storefront';

interface CartItem {
  product: StorefrontProduct;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: StorefrontProduct, size: string, color: string, quantity: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateCartQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const savedCart = window.localStorage.getItem('reverie-cart');
    const savedWishlist = window.localStorage.getItem('reverie-wishlist');

    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setCart(
            parsed.map((item) => ({
              ...item,
              unitPrice:
                typeof item.unitPrice === 'number'
                  ? item.unitPrice
                  : getVariantPrice(item.product, item.size, item.color),
            }))
          );
        }
      } catch (error) {
        console.error('Failed to parse saved cart.', error);
      }
    }

    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Failed to parse saved wishlist.', error);
      }
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem('reverie-cart', JSON.stringify(cart));
  }, [cart, isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem('reverie-wishlist', JSON.stringify(wishlist));
  }, [wishlist, isHydrated]);

  const addToCart = (product: StorefrontProduct, size: string, color: string, quantity: number) => {
    const unitPrice = getVariantPrice(product, size, color);
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.color === color
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.color === color
            ? { ...item, quantity: item.quantity + quantity, unitPrice }
            : item
        );
      }

      return [...prevCart, { product, size, color, quantity, unitPrice }];
    });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.size === size &&
            item.color === color
          )
      )
    );
  };

  const updateCartQuantity = (
    productId: string,
    size: string,
    color: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId &&
        item.size === size &&
        item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(productId)
        ? prevWishlist.filter((id) => id !== productId)
        : [...prevWishlist, productId]
    );
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
