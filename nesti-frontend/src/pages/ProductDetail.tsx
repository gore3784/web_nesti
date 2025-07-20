import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  HeartIcon,
  ShoppingCartIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Product, Category } from '@/types';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

export const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isImageOpen, setIsImageOpen] = useState(false); // ✅ untuk popup gambar

  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } =
    useStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/products/slug/${slug}`
        );
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProduct();
  }, [slug]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
        if (!res.ok) throw new Error('Categories not found');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-muted rounded-lg h-96"></div>
            <div className="space-y-4">
              <div className="bg-muted h-8 rounded w-3/4"></div>
              <div className="bg-muted h-4 rounded w-1/2"></div>
              <div className="bg-muted h-6 rounded w-1/4"></div>
              <div className="bg-muted h-20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} × ${product.name} added to cart!`);
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <div
            className="relative cursor-pointer"
            onClick={() => setIsImageOpen(true)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            {product.stock <= 5 && product.stock > 0 && (
              <Badge variant="destructive" className="absolute top-4 left-4">
                Only {product.stock} left
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge variant="secondary" className="absolute top-4 left-4">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* ✅ Dialog popup untuk gambar besar */}
          <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
            <DialogContent className="max-w-5xl">
              <DialogHeader>
                <DialogTitle>{product.name}</DialogTitle>
              </DialogHeader>
              <div className="flex justify-center items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-[80vh] object-contain rounded-lg"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="text-3xl font-bold text-primary mb-4">
              {formatPrice(product.price)}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Stock: {product.stock} available
              </span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Quantity</label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 border rounded text-center min-w-[60px]">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full"
              size="lg"
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              {product.stock === 0 ? 'Out of Stock' : `Add ${quantity} to Cart`}
            </Button>

            <Button
              variant="outline"
              onClick={handleWishlistToggle}
              className="w-full"
              size="lg"
            >
              {inWishlist ? (
                <>
                  <HeartSolidIcon className="h-5 w-5 mr-2 text-destructive" />
                  Remove from Wishlist
                </>
              ) : (
                <>
                  <HeartIcon className="h-5 w-5 mr-2" />
                  Add to Wishlist
                </>
              )}
            </Button>
          </div>

          {/* Product Details */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Product Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Slug:</span>
                  <span>{product.slug}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Availability:</span>
                  <span
                    className={
                      product.stock > 0 ? 'text-green-600' : 'text-red-600'
                    }
                  >
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span>{categories.find((c) => c.id === product.category_id)?.name}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
