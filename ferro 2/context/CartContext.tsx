'use client';

import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  size: string;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type CartAction =
  | { type: 'ADD'; item: Omit<CartItem, 'quantity'>; quantity: number }
  | { type: 'REMOVE'; slug: string; size: string }
  | { type: 'SET_QTY'; slug: string; size: string; quantity: number }
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'HYDRATE'; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(
        (i) => i.slug === action.item.slug && i.size === action.item.size
      );
      const items = existing
        ? state.items.map((i) =>
            i.slug === action.item.slug && i.size === action.item.size
              ? { ...i, quantity: i.quantity + action.quantity }
              : i
          )
        : [...state.items, { ...action.item, quantity: action.quantity }];
      return { ...state, items, isOpen: true };
    }
    case 'REMOVE':
      return {
        ...state,
        items: state.items.filter((i) => !(i.slug === action.slug && i.size === action.size))
      };
    case 'SET_QTY':
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.slug === action.slug && i.size === action.size
              ? { ...i, quantity: action.quantity }
              : i
          )
          .filter((i) => i.quantity > 0)
      };
    case 'OPEN':
      return { ...state, isOpen: true };
    case 'CLOSE':
      return { ...state, isOpen: false };
    case 'HYDRATE':
      return { ...state, items: action.items };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  subtotal: number;
  count: number;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (slug: string, size: string) => void;
  setQuantity: (slug: string, size: string, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'ferro-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: 'HYDRATE', items: JSON.parse(raw) });
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // ignore
    }
  }, [state.items]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const count = state.items.reduce((sum, i) => sum + i.quantity, 0);
    return {
      items: state.items,
      isOpen: state.isOpen,
      subtotal,
      count,
      addItem: (item, quantity = 1) => dispatch({ type: 'ADD', item, quantity }),
      removeItem: (slug, size) => dispatch({ type: 'REMOVE', slug, size }),
      setQuantity: (slug, size, quantity) => dispatch({ type: 'SET_QTY', slug, size, quantity }),
      openCart: () => dispatch({ type: 'OPEN' }),
      closeCart: () => dispatch({ type: 'CLOSE' })
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
