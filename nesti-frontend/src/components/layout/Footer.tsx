import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">H</span>
              </div>
              <span className="font-bold text-xl">Hinggi.id</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Hinggi.id adalah toko online yang menyediakan berbagai produk dengan harga terjangkau.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Home
              </Link>
              <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Products
              </Link>
              <Link to="/categories" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Categories
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                About Us
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold">Customer Service</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Contact Us
              </Link>
              <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                FAQ
              </Link>
              <Link to="/shipping" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Shipping Info
              </Link>
              <Link to="/returns" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Returns
              </Link>
            </nav>
          </div>

          {/* Account */}
          <div className="space-y-4">
            <h3 className="font-semibold">Account</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/profile" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                My Account
              </Link>
              <Link to="/orders" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Order History
              </Link>
              <Link to="/wishlist" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Wishlist
              </Link>
              <Link to="/cart" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Shopping Cart
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Hinggi.id. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};