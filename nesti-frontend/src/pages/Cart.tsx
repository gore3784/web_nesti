import { Link, useNavigate } from 'react-router-dom';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';
import { LoginModal } from '@/components/auth/LoginModal';
import { RegisterModal } from '@/components/auth/RegisterModal';
import { useState } from 'react';

export const Cart = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart, 
    getCartTotal,
    user 
  } = useStore();
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateCartQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast.success(`${productName} removed from cart`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared');
  };

  const handleCheckout = () => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      navigate('/checkout');
    }
  };

  const handleSwitchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button asChild size="lg">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  const total = getCartTotal();
  const shipping = 50000; // Fixed shipping cost
  const grandTotal = total + shipping;

  return (
    <div className="container py-4 md:py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Shopping Cart</h1>
        <Button variant="outline" onClick={handleClearCart} size="sm" className="self-start sm:self-auto">
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3 md:space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg flex-shrink-0 mx-auto sm:mx-0"
                  />
                  
                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
                      <div className="flex-1 min-w-0 w-full sm:pr-4">
                        <h3 className="font-semibold text-base md:text-lg mb-1 line-clamp-2 text-center sm:text-left">
                          <Link 
                            to={`/products/${item.product.slug}`}
                            className="hover:text-primary transition-colors"
                          >
                            {item.product.name}
                          </Link>
                        </h3>
                        <p className="text-muted-foreground text-sm text-center sm:text-left">
                          <span className="font-medium">{formatPrice(item.product.price)}</span> each
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                        className="flex-shrink-0 self-center sm:self-start"
                      >
                        <TrashIcon className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center space-x-2 mx-auto sm:mx-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-8 w-8 p-0"
                        >
                          <MinusIcon className="h-3 w-3" />
                        </Button>
                        <span className="px-3 py-1 border rounded text-center min-w-[60px] font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="h-8 w-8 p-0"
                        >
                          <PlusIcon className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="text-center sm:text-right">
                        <div className="font-bold text-lg text-primary">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.quantity} × {formatPrice(item.product.price)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg md:text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              <div className="flex justify-between text-sm md:text-base">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm md:text-base">
                <span>Shipping</span>
                <span>{formatPrice(shipping)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-base md:text-lg">
                <span>Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
              
              <div className="space-y-2 pt-4">
                <Button onClick={handleCheckout} className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <LoginModal 
        open={showLoginModal} 
        onOpenChange={setShowLoginModal}
        onSwitchToRegister={handleSwitchToRegister}
      />
      
      <RegisterModal 
        open={showRegisterModal} 
        onOpenChange={setShowRegisterModal}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </div>
  );
};