import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { CalendarIcon } from '@heroicons/react/24/outline'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import type { OrderItem, ShippingAddress } from '@/types'

interface Order {
  id: number
  created_at: string
  status: string
  total_amount: number
  items: OrderItem[]
  shipping_address: ShippingAddress
  payment_method?: string
  payment_status?: string
  order_number?: string
}

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
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
    fetchOrders()
  }, [])

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>
      case 'paid':
        return <Badge className="bg-green-500">Paid</Badge>
      case 'shipped':
        return <Badge className="bg-blue-500">Shipped</Badge>
      case 'completed':
        return <Badge className="bg-emerald-600">Delivered</Badge>
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPaymentBadge = (paymentStatus?: string) => {
    switch (paymentStatus) {
      case 'paid':
        return <Badge className="bg-green-500">Payment: Paid</Badge>
      case 'pending':
        return <Badge className="bg-yellow-500">Payment: Pending</Badge>
      case 'expired':
        return <Badge variant="destructive">Payment: Expired</Badge>
      case 'cancelled':
        return <Badge variant="destructive">Payment: Cancelled</Badge>
      case 'challenge':
        return <Badge variant="outline">Payment: Challenge</Badge>
      default:
        return paymentStatus ? (
          <Badge variant="secondary">Payment: {paymentStatus}</Badge>
        ) : null
    }
  }

  const openDetail = (order: Order) => {
    setSelectedOrder(order)
    setIsDetailOpen(true)
  }

  if (loading) {
    return <div className="container py-8">Loading orders...</div>
  }

  const renderOrders = (filter?: string) => {
    const filtered = filter && filter !== 'all'
      ? orders.filter((o) => o.status === filter)
      : orders
    if (filtered.length === 0) {
      return <p className="text-sm text-muted-foreground">No orders found.</p>
    }
    return filtered.map((order) => (
      <Card key={order.id} className="shadow-sm">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">
                Order #{order.order_number ?? order.id}
              </CardTitle>
              <CardDescription className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  {formatDate(order.created_at)}
                </span>
                <span>{order.order_items?.length ?? 0} items</span>
                {getPaymentBadge(order.payment_status)}
              </CardDescription>
            </div>
            <div className="text-right">
              {getStatusBadge(order.status)}
              <div className="text-lg font-bold mt-1">
                {formatPrice(order.total_amount)}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border-t pt-4 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => openDetail(order)}
            >
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    ))
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">Order History</h1>
      <p className="text-muted-foreground mb-6">Track and manage your orders</p>

      <Tabs defaultValue="all">
        <TabsList className="grid grid-cols-6 w-full mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="completed">Delivered</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {renderOrders('all')}
        </TabsContent>
        <TabsContent value="pending" className="space-y-6">
          {renderOrders('pending')}
        </TabsContent>
        <TabsContent value="paid" className="space-y-6">
          {renderOrders('paid')}
        </TabsContent>
        <TabsContent value="shipped" className="space-y-6">
          {renderOrders('shipped')}
        </TabsContent>
        <TabsContent value="completed" className="space-y-6">
          {renderOrders('completed')}
        </TabsContent>
        <TabsContent value="cancelled" className="space-y-6">
          {renderOrders('cancelled')}
        </TabsContent>
      </Tabs>

      {/* Modal Detail */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Order Details – #{selectedOrder?.order_number ?? selectedOrder?.id}
            </DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              {/* Shipping info */}
              <div className="border p-3 rounded-md">
                <h4 className="font-medium mb-2">Shipping Address</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedOrder.shipping_address.full_name}
                  <br />
                  {selectedOrder.shipping_address.address}
                  <br />
                  {selectedOrder.shipping_address.city},{' '}
                  {selectedOrder.shipping_address.province}{' '}
                  {selectedOrder.shipping_address.postal_code}
                  <br />
                  📞 {selectedOrder.shipping_address.phone}
                </p>
              </div>

              {/* Items */}
              <div className="space-y-2">
                <h4 className="font-medium">Items</h4>
                {selectedOrder?.order_items?.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.product?.name} × {item.quantity}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
              {(() => {
                const grandTotal = selectedOrder.total_amount
                return (
                  <div className="border p-3 rounded-md">
                    <div className="flex justify-between text-sm">
                      <span>Setelah dihtiung dengan biaya Shipping</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(grandTotal)}</span>
                    </div>
                  </div>
                )
              })()}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
