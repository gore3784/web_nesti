import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingBag, 
  Tags, 
  Menu,
  X,
  LogOut,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
  { name: 'Categories', href: '/admin/categories', icon: Tags },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { name: 'Users', href: '/admin/users', icon: Users },
];

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, setUser } = useStore();

  const handleLogout = () => {
    setUser(null);
    window.location.href = '/';
  };

  const isActiveRoute = (href: string, exact = false) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-muted/10">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-card border-r transform transition-transform duration-200 ease-in-out",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">A</span>
              </div>
              <h1 className="text-lg font-semibold">Hinggi.id Admin</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {sidebarItems.map((item) => {
              const isActive = isActiveRoute(item.href, item.exact);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t p-4 space-y-4">
            <Button variant="outline" size="sm" asChild className="w-full">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Kembali ke Toko
              </Link>
            </Button>
            
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{user?.full_name || user?.email}</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-background/95 backdrop-blur border-b flex items-center px-6">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden mr-4"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center justify-between w-full">
            <div>
              <h2 className="text-lg font-semibold capitalize">
                {location.pathname.split('/').pop() || 'Dashboard'}
              </h2>
              <p className="text-sm text-muted-foreground">
                Selamat datang, {user?.full_name || 'Admin'}
              </p>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};