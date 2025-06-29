import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: number;
  slug: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  cart: CartItem[]; 
  addToCart: (product: CartItem) => void; 
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, amount: number) => void;  
  clearCart: () => void;

  getTotalQuantity: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
    
      addToCart: (product) =>
       
        set((state) => {
            const itemInCart = state.cart.find((item) => item.id === product.id);
            if (itemInCart) {
                return {
                    cart: state.cart.map((item) => 
                        item.id === product.id ? {...item, quantity: item.quantity + 1} : item
                    ),
                }
            } else {
                return { cart: [...state.cart, {...product, quantity: 1}]};
            }
        }),
   
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

        updateQuantity: (id, amount) =>
        set((state) => ({
            cart: state.cart
            .map((item) => 
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ cart: [] }),

      getTotalQuantity: () => {
        return get().cart.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
