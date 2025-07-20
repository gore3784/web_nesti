import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Search, UserCheck, UserX } from 'lucide-react';
import { toast } from 'sonner';
import type { User } from '@/types';

interface UserWithStats extends User {
  orders_count: number;
  total_spent: number;
}

export const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<UserWithStats[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Ambil data dari API Laravel
  useEffect(() => {
    setLoading(true);
    axios
      .get<UserWithStats[]>('/api/admin/users')
      .then((res) => {
        setUsers(res.data || []);
      })
      .catch((err) => {
        console.error('Load users error:', err.response?.status, err.response?.data || err.message);
        toast.error('Gagal memuat daftar pengguna');
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  // 🔎 Filter pencarian
  const filteredUsers = users.filter(
    (user) =>
      (user.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone || '').includes(searchTerm)
  );

  // 💰 Format angka
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
    });

  const getStatusBadge = (status: 'active' | 'inactive') =>
    status === 'active' ? (
      <Badge variant="default">Active</Badge>
    ) : (
      <Badge variant="secondary">Inactive</Badge>
    );

  // 📊 Statistik
  const totalUsers = users.length;
  const totalOrders = users.reduce((sum, u) => sum + u.orders_count, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Pengguna</h1>
        <p className="text-muted-foreground">Kelola akun pelanggan</p>
      </div>

      {/* 📌 Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
            <UserCheck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Order</CardTitle>
            <UserCheck className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Memuat pengguna...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>No. Telp</TableHead>
                  <TableHead>Tanggal Bergabung</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Total Belanja</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{user.full_name || 'N/A'}</p>
                        <p className="text-sm text-muted-foreground">ID: {user.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone || 'N/A'}</TableCell>
                    <TableCell>{formatDate(user.created_at)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.orders_count}</Badge>
                    </TableCell>
                    <TableCell>{formatPrice(user.total_spent)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <UserCheck className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <UserX className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
