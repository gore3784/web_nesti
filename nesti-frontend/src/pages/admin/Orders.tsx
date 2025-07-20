import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Eye, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';
import type { Order, OrderItem } from '@/types';

export const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const loadOrders = async () => {
    try {
      const res = await axios.get<Order[]>('/api/admin/orders');
      setOrders(res.data);
    } catch (err: any) {
      console.error('Load orders error', err.response?.data || err.message);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toString().includes(searchTerm) ||
      (order.shipping_address?.full_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ?? false);
    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'paid':
        return <Badge variant="default">Paid</Badge>;
      case 'shipped':
        return <Badge variant="outline">Shipped</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPaymentBadge = (payment_status: string) => {
    switch (payment_status) {
      case 'paid':
        return <Badge className="bg-green-500">Paid</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'expired':
        return <Badge variant="destructive">Expired</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      case 'challenge':
        return <Badge variant="outline">Challenge</Badge>;
      case 'denied':
        return <Badge variant="destructive">Denied</Badge>;
      default:
        return <Badge variant="secondary">{payment_status}</Badge>;
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const handleViewOrder = async (order: Order) => {
    try {
      const res = await axios.get<Order>(`/api/admin/orders/${order.id}`);
      setSelectedOrder(res.data);
      setIsDialogOpen(true);
    } catch (err: any) {
      toast.error('Gagal memuat detail order');
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: Order['status']) => {
    try {
      await axios.put(`/api/admin/orders/${orderId}/status`, {
        status: newStatus,
      });
      toast.success('Order status updated');
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err: any) {
      console.error('Update status error', err.response?.data || err.message);
      toast.error('Failed to update status');
    }
  };

  if (loading) {
    return <p className="p-6">Loading orders...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">Manage customer orders</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order List</CardTitle>
          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="completed">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <code className="font-mono">#{order.id}</code>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{order.shipping_address?.full_name ?? '-'}</p>
                    <p className="text-sm text-muted-foreground">{order.shipping_address?.phone ?? '-'}</p>
                  </TableCell>
                  <TableCell>{formatDate(order.created_at)}</TableCell>
                  <TableCell>{formatPrice(order.total_amount)}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(val) => handleStatusChange(order.id, val as Order['status'])}
                    >
                      <SelectTrigger className="w-[130px]">
                        {getStatusBadge(order.status)}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="completed">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{getPaymentBadge(order.payment_status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex justify-between items-center mt-4">
            <Button variant="outline" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </Button>
            <div className="space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              Order Details {selectedOrder && <span className="font-mono">#{selectedOrder.id}</span>}
            </DialogTitle>
          </DialogHeader>
          {selectedOrder ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {selectedOrder.shipping_address?.full_name ?? '-'}</p>
                    <p><strong>Phone:</strong> {selectedOrder.shipping_address?.phone ?? '-'}</p>
                    <p><strong>Address:</strong> {selectedOrder.shipping_address?.address ?? '-'}</p>
                    <p><strong>City:</strong> {selectedOrder.shipping_address?.city ?? '-'}</p>
                    <p><strong>Province:</strong> {selectedOrder.shipping_address?.province ?? '-'}</p>
                    <p><strong>Postal Code:</strong> {selectedOrder.shipping_address?.postal_code ?? '-'}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Order Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>Date:</strong> {formatDate(selectedOrder.created_at)}</p>
                    <p><strong>Status:</strong> {getStatusBadge(selectedOrder.status)}</p>
                    <p><strong>Payment:</strong> {getPaymentBadge(selectedOrder.payment_status)}</p>
                    <p><strong>Total:</strong> {formatPrice(selectedOrder.total_amount)}</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder?.order_items && selectedOrder.order_items.length > 0 ? (
                        selectedOrder.order_items.map((item: OrderItem) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                {item.product?.image && (
                                  <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-12 h-12 rounded object-cover"
                                  />
                                )}
                                <div>
                                  <p className="font-medium">{item.product?.name}</p>
                                  <p className="text-xs text-muted-foreground">{item.product?.description}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{formatPrice(item.product.price)}</TableCell>
                            <TableCell className="font-medium">{formatPrice(item.price)}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-muted-foreground">
                            No items found in this order.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-6">No order selected.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
