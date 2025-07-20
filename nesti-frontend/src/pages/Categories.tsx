import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/store/useStore';
import { Category, Product } from '@/types';

export const Categories = () => {
  const { setSelectedCategory } = useStore();

  // ✅ state untuk data dari API
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // ✅ load data kategori dan produk
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/categories`),
          fetch(`${import.meta.env.VITE_API_URL}/products`)
        ]);
        const [catData, prodData] = await Promise.all([catRes.json(), prodRes.json()]);
        setCategories(catData);
        setProducts(prodData);
      } catch (error) {
        console.error('Failed to load categories or products:', error);
      }
    };
    fetchData();
  }, []);

  // ✅ hitung jumlah produk per kategori
  const getCategoryProductCount = (categoryId: string | number) => {
    return products.filter((p) => p.category_id.toString() === categoryId.toString()).length;
  };

  const handleCategoryClick = (categoryId: string | number) => {
    setSelectedCategory(categoryId.toString());
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Product Categories</h1>
        <p className="text-muted-foreground">
          Browse our wide selection of products by category
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
          >
            <Link to="/products" onClick={() => handleCategoryClick(category.id)}>
              <CardHeader>
                <CardTitle className="text-xl">{category.name}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {getCategoryProductCount(category.id)} products available
                  </span>
                  <span className="text-primary font-semibold">Browse →</span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* Featured Categories Section */}
      {/* <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.slice(0, 4).map((category) => (
            <Link
              key={category.id}
              to="/products"
              onClick={() => handleCategoryClick(category.id)}
              className="group"
            >
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <div className="text-center">
                  <div className="text-2xl mb-2">
                    {category.name.toLowerCase().includes('electronic') && '📱'}
                    {category.name.toLowerCase().includes('fashion') && '👕'}
                    {category.name.toLowerCase().includes('home') && '🏠'}
                    {category.name.toLowerCase().includes('sport') && '⚽'}
                    {category.name.toLowerCase().includes('book') && '📚'}
                    {category.name.toLowerCase().includes('sarung') && <img src="https://pixvid.org/images/2025/07/12/0UYnR.th.jpeg" alt="WhatsApp Image 2025 04 14 at 20.40.58" />}
                    {category.name.toLowerCase().includes('tenun') && <img src="https://pixvid.org/images/2025/07/12/0UYnR.th.jpeg" alt="WhatsApp Image 2025 04 14 at 20.40.58" />}
                    {category.name.toLowerCase().includes('tas') && <img src="https://pixvid.org/images/2025/07/12/0UOub.th.jpeg" alt="WhatsApp Image 2025 05 03 at 19.19.53" />}
                    {category.name.toLowerCase().includes('dres') && <img src="https://pixvid.org/images/2025/07/12/0UOzd.th.jpeg" alt="WhatsApp Image 2025 05 03 at 19.37.11" />}
                    {category.name.toLowerCase().includes('baju') && <img src="https://pixvid.org/images/2025/07/12/0UlbT.th.jpeg" alt="WhatsApp Image 2025 05 03 at 19.19.50" />}
                  </div>
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div> */}
    </div>
  );
};
