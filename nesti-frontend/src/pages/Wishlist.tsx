import { Link } from 'react-router-dom';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

export const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, addToCart } = useStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleRemoveFromWishlist = (productId: string, productName: string) => {
    removeFromWishlist(productId);
    toast.success(`${productName} removed from wishlist`);
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <HeartIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Save items you love by clicking the heart icon on any product.
          </p>
          <Button asChild size="lg">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
        <p className="text-muted-foreground">
          {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                  onClick={() => handleRemoveFromWishlist(item.product_id, item.product.name)}
                >
                  <HeartIcon className="h-4 w-4 fill-destructive text-destructive" />
                </Button>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  <Link 
                    to={`/products/${item.product.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {item.product.name}
                  </Link>
                </h3>
                
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {item.product.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-primary">
                    {formatPrice(item.product.price)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Stock: {item.product.stock}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    className="w-full" 
                    onClick={() => handleAddToCart(item.product)}
                    disabled={item.product.stock === 0}
                  >
                    <ShoppingCartIcon className="h-4 w-4 mr-2" />
                    {item.product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/products/${item.product.slug}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};