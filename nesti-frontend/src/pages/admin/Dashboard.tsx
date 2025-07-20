import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, Users, ShoppingBag, TrendingUp } from 'lucide-react'
import { toast } from 'sonner'

interface RecentOrder {
  id: number
  total_amount: number
  status: string
  created_at: string
  user?: {
    full_name: string
  }
}

interface LowStockItem {
  id: number
  name: string
  stock: number
}

interface DashboardResponse {
  totalProducts: number
  lowStockProducts: number
  totalOrders: number
  totalRevenue: number
  recentOrders: RecentOrder[]
  lowStockList: LowStockItem[]
}

export const AdminDashboard = () => {
  const [loading, setLoading] = useState(true)
  const [totalProducts, setTotalProducts] = useState(0)
  const [lowStockProducts, setLowStockProducts] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [lowStockList, setLowStockList] = useState<LowStockItem[]>([])

  useEffect(() => {
    setLoading(true)
    axios
      .get<DashboardResponse>('/api/admin/dashboard')
      .then((res) => {
        const data = res.data
        setTotalProducts(data.totalProducts)
        setLowStockProducts(data.lowStockProducts)
        setTotalOrders(data.totalOrders)
        setTotalRevenue(data.totalRevenue)
        setRecentOrders(data.recentOrders || [])
        setLowStockList(data.lowStockList || [])
      })
      .catch((err) => {
        console.error('Dashboard load error:', err.response?.data || err.message)
        toast.error('Gagal memuat data dashboard')
      })
      .then(() => {
        setLoading(false)
      })
  }, [])

  const stats = [
    { title: 'Total Produk', value: totalProducts, icon: Package, color: 'text-blue-600' },
    { title: 'Produk Dengan Stok Rendah', value: lowStockProducts, icon: TrendingUp, color: 'text-orange-600' },
    { title: 'Total Transaksi', value: totalOrders, icon: ShoppingBag, color: 'text-green-600' },
    {
      title: 'Pendapatan',
      value: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalRevenue),
      icon: Users,
      color: 'text-purple-600'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Ringkasan dari toko e-commerce Anda</p>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading dashboard...</p>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Transaksi Terbaru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 bg-accent rounded-lg"
                    >
                      <div>
                        <p className="font-medium">Transaksi #{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.user?.full_name || 'Customer'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR'
                          }).format(order.total_amount)}
                        </p>
                        <p
                          className={`text-sm ${order.status === 'completed'
                              ? 'text-green-600'
                              : order.status === 'processing'
                                ? 'text-yellow-600'
                                : 'text-blue-600'
                            }`}
                        >
                          {order.status}
                        </p>
                      </div>
                    </div>
                  ))}
                  {recentOrders.length === 0 && (
                    <p className="text-sm text-muted-foreground">Tidak ada transaksi terbaru</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Peringatan Stok</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lowStockList.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 bg-accent rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-red-600">Low Stock</p>
                      </div>
                    </div>
                  ))}
                  {lowStockList.length === 0 && (
                    <p className="text-sm text-muted-foreground">Tidak ada produk dengan stok rendah</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
