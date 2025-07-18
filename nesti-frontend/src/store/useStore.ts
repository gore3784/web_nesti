import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, User, Wishlist } from '@/types';

interface Store {
  // Cart state
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;

  // Wishlist state
  wishlistItems: Wishlist[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // User state
  user: User | null;
  setUser: (user: User | null) => void;

  // UI state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (categoryId: string | null) => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // Cart state
      cartItems: [],
      addToCart: (product, quantity = 1) => {
        const { cartItems } = get();
        const existingItem = cartItems.find(item => item.product.id === product.id);
        
        if (existingItem) {
          set({
            cartItems: cartItems.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({
            cartItems: [...cartItems, { 
              id: `cart-${product.id}-${Date.now()}`, 
              product, 
              quantity 
            }]
          });
        }
      },
      removeFromCart: (productId) => {
        set({ 
          cartItems: get().cartItems.filter(item => item.product.id !== productId) 
        });
      },
      updateCartQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        
        set({
          cartItems: get().cartItems.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          )
        });
      },
      clearCart: () => set({ cartItems: [] }),
      getCartTotal: () => {
        return get().cartItems.reduce(
          (total, item) => total + (item.product.price * item.quantity), 
          0
        );
      },
      getCartItemsCount: () => {
        return get().cartItems.reduce((count, item) => count + item.quantity, 0);
      },

      // Wishlist state
      wishlistItems: [],
      addToWishlist: (product) => {
        const { wishlistItems } = get();
        if (!wishlistItems.find(item => item.product_id === product.id)) {
          set({
            wishlistItems: [...wishlistItems, {
              id: `wishlist-${product.id}-${Date.now()}`,
              user_id: get().user?.id || 'guest',
              product_id: product.id,
              product,
              created_at: new Date().toISOString()
            }]
          });
        }
      },
      removeFromWishlist: (productId) => {
        set({
          wishlistItems: get().wishlistItems.filter(item => item.product_id !== productId)
        });
      },
      isInWishlist: (productId) => {
        return get().wishlistItems.some(item => item.product_id === productId);
      },

      // User state
      user: null,
      setUser: (user) => set({ user }),

      // UI state
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      selectedCategory: null,
      setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId }),
    }),
    {
      name: 'Hinggi.id-store',
      partialize: (state) => ({
        cartItems: state.cartItems,
        wishlistItems: state.wishlistItems,
        user: state.user,
      }),
    }
  )
);