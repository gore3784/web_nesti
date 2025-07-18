import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalendarIcon, ArchiveBoxIcon, TruckIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { PaymentMethodModal } from '@/components/payment/PaymentMethodModal'

interface OrderItem {
  id: number
  quantity: number
  price: number
  product: { id: number; name: string; image?: string }
}

interface ShippingAddress {
  full_name: string
  address: string
  city: string
  province: string
  postal_code: string
}

interface Order {
  id: number
  created_at: string
  status: string
  total_amount: number
  items: OrderItem[]
  shipping_address: ShippingAddress
  payment_method?: string
}

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  // state modal detail
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  // state modal payment
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState('')
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null)

  const fetchOrders = async () => {
    try {
      const res = await axios.get<Order[]>('/api/orders')
      setOrders(res.data)
    } catch (e: any) {
      console.error(e)
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>
      case 'paid':
        return <Badge>Paid</Badge>
      case 'shipped':
        return <Badge className="bg-blue-500">Shipped</Badge>
      case 'completed':
        return <Badge className="bg-green-500">Delivered</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const openDetail = (order: Order) => {
    setSelectedOrder(order)
    setIsDetailOpen(true)
  }

  const openPaymentModal = (orderId: number) => {
    setSelectedOrderId(orderId)
    setIsPaymentModalOpen(true)
  }

  const handleConfirmPayment = async () => {
    if (!selectedOrderId || !selectedMethod) return
    try {
      await axios.put(`/api/orders/${selectedOrderId}/pay`, { payment_method: selectedMethod })
      toast.success('Metode pembayaran diperbarui!')
      fetchOrders()
    } catch (err: any) {
      console.error(err)
      toast.error('Gagal memperbarui pembayaran')
    } finally {
      setIsPaymentModalOpen(false)
      setSelectedMethod('')
      setSelectedOrderId(null)
    }
  }

  if (loading) return <div className="container py-8">Loading orders...</div>

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">Order History</h1>
      <p className="text-muted-foreground mb-6">Track and manage your orders</p>

      <Tabs defaultValue="all">
        <TabsList className="grid grid-cols-4 w-full mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="completed">Delivered</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Order #{order.id}</CardTitle>
                    <CardDescription className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" /> {formatDate(order.created_at)}
                      </span>
                      <span>{order.items.length} items</span>
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(order.status)}
                    <div className="text-lg font-bold mt-1">{formatPrice(order.total_amount)}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border-t pt-4 flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => openDetail(order)}>
                    View Details
                  </Button>
                  {order.status === 'pending' && (
                    <Button size="sm" onClick={() => openPaymentModal(order.id)}>
                      Bayar Sekarang
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* tab lain */}
        {['pending', 'paid', 'completed'].map((status) => (
          <TabsContent key={status} value={status} className="space-y-6">
            {orders
              .filter((o) => o.status === status)
              .map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>Order #{order.id}</CardTitle>
                        <CardDescription className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="h-4 w-4" /> {formatDate(order.created_at)}
                          </span>
                          <span>{order.items.length} items</span>
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(order.status)}
                        <div className="text-lg font-bold mt-1">{formatPrice(order.total_amount)}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="border-t pt-4 flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => openDetail(order)}>
                        View Details
                      </Button>
                      {order.status === 'pending' && (
                        <Button size="sm" onClick={() => openPaymentModal(order.id)}>
                          Bayar Sekarang
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        ))}
      </Tabs>

      {/* Modal Detail */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details - #{selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="border p-3 rounded-md">
                <h4 className="font-medium mb-2">Shipping Address</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedOrder.shipping_address.full_name} <br />
                  {selectedOrder.shipping_address.address} <br />
                  {selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.province}{' '}
                  {selectedOrder.shipping_address.postal_code}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Items</h4>
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(selectedOrder.total_amount)}</span>
              </div>

              {/* upload/share bukti pembayaran */}
              {selectedOrder.status === 'pending' && (
                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    Upload Bukti Pembayaran
                  </Button>
                  {/* nanti bisa diganti dengan input file atau redirect ke form upload */}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Method Modal */}
      <PaymentMethodModal
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        selectedMethod={selectedMethod}
        onMethodSelect={setSelectedMethod}
        onConfirm={handleConfirmPayment}
      />
    </div>
  )
}
