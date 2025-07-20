import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  TruckIcon,
  ClockIcon,
  MapPinIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';

// contoh data order, biasanya kamu fetch dari API
const sampleOrders = [
  { id: 1, status: 'pending', total: 250000 },
  { id: 2, status: 'paid', total: 300000 },
  { id: 3, status: 'shipped', total: 350000 },
  { id: 4, status: 'completed', total: 450000 },
  { id: 5, status: 'cancelled', total: 150000 },
];

export const Shipping = () => {
  const [currentTab, setCurrentTab] = useState('pending');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500">Menunggu</Badge>;
      case 'paid':
        return <Badge className="bg-green-500">Dibayar</Badge>;
      case 'shipped':
        return <Badge className="bg-blue-500">Dikirim</Badge>;
      case 'completed':
        return <Badge className="bg-emerald-600">Terkirim</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Dibatalkan</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="container py-8 space-y-10">
      {/* ================= SHIPPING INFORMATION ================= */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Informasi Pengiriman</h1>
        <p className="text-muted-foreground mb-8">
          Semua yang perlu Anda ketahui tentang kebijakan pengiriman dan opsi pengantaran kami
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Options */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TruckIcon className="h-5 w-5" />
                  <span>Pilihan Pengiriman</span>
                </CardTitle>
                <CardDescription>
                  Pilih kecepatan pengiriman yang sesuai dengan Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Pengiriman Standar</h4>
                    <Badge variant="secondary">Paling Populer</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Pengiriman andal untuk pesanan sehari-hari
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Waktu Pengiriman:</span>
                      <p className="text-muted-foreground">
                        2-5 hari kerja
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Biaya:</span>
                      <p className="text-muted-foreground">
                        {formatPrice(15000)} - {formatPrice(35000)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Pengiriman Ekspres</h4>
                    <Badge variant="default">Cepat</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Pengiriman cepat ketika Anda membutuhkannya segera
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Waktu Pengiriman:</span>
                      <p className="text-muted-foreground">
                        1-2 hari kerja
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Biaya:</span>
                      <p className="text-muted-foreground">
                        {formatPrice(25000)} - {formatPrice(50000)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Pengiriman Hari yang Sama</h4>
                    <Badge variant="destructive">Khusus NTT</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Pesanan sampai di hari yang sama (hanya area NTT)
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Waktu Pengiriman:</span>
                      <p className="text-muted-foreground">Hari yang sama</p>
                    </div>
                    <div>
                      <span className="font-medium">Biaya:</span>
                      <p className="text-muted-foreground">
                        {formatPrice(50000)} - {formatPrice(75000)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPinIcon className="h-5 w-5" />
                  <span>Area Pengiriman</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-600">
                      NTT & Sekitarnya
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      NTT, Jawa Timur, Jawa Barat, Sumatera, Kalimantan, Sulawesi
                    </p>
                    <p className="text-sm font-medium">
                      Semua opsi pengiriman tersedia
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-blue-600">
                      Kota Besar
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Bandung, Surabaya, Yogyakarta, Semarang, Medan, Makassar
                    </p>
                    <p className="text-sm font-medium">
                      Pengiriman Standar & Ekspres
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-orange-600">
                      Area Lain
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Semua kota dan daerah lain di Indonesia
                    </p>
                    <p className="text-sm font-medium">
                      Hanya Pengiriman Standar
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Shipping Policies */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShieldCheckIcon className="h-5 w-5" />
                  <span>Gratis Ongkir</span>
                </CardTitle>
                <CardDescription>
                  Nikmati gratis ongkir untuk pesanan tertentu
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">
                    Gratis Ongkir Standar
                  </h4>
                  <p className="text-sm text-green-700">
                    Pesanan di atas {formatPrice(500000)} dalam area NTT mendapatkan gratis ongkir standar.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Gratis Ongkir Ekspres
                  </h4>
                  <p className="text-sm text-blue-700">
                    Pesanan di atas {formatPrice(1000000)} dalam area NTT mendapatkan gratis ongkir ekspres.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ClockIcon className="h-5 w-5" />
                  <span>Waktu Pemrosesan</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold">Pemrosesan Pesanan</h4>
                  <p className="text-sm text-muted-foreground">
                    Sebagian besar pesanan diproses dalam 1-2 hari kerja setelah konfirmasi pembayaran.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Batas Waktu</h4>
                  <p className="text-sm text-muted-foreground">
                    Pesanan yang dibuat sebelum pukul 14.00 di hari kerja biasanya diproses di hari yang sama.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Akhir Pekan & Hari Libur</h4>
                  <p className="text-sm text-muted-foreground">
                    Pesanan yang dibuat pada akhir pekan atau hari libur akan diproses di hari kerja berikutnya.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* ================= ORDER DETAILS WITH TABS ================= */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Detail Pesanan per Status</h2>
        <Tabs defaultValue="pending" onValueChange={setCurrentTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="pending">Menunggu</TabsTrigger>
            <TabsTrigger value="paid">Dibayar</TabsTrigger>
            <TabsTrigger value="shipped">Dikirim</TabsTrigger>
            <TabsTrigger value="completed">Terkirim</TabsTrigger>
            <TabsTrigger value="cancelled">Dibatalkan</TabsTrigger>
          </TabsList>

          {['pending','paid','shipped','completed','cancelled'].map((status) => (
            <TabsContent key={status} value={status}>
              <div className="grid gap-4">
                {sampleOrders
                  .filter((o) => o.status === status)
                  .map((order) => (
                    <Card key={order.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>Pesanan #{order.id}</span>
                          {renderStatusBadge(order.status)}
                        </CardTitle>
                        <CardDescription>Total: {formatPrice(order.total)}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                {sampleOrders.filter((o) => o.status === status).length === 0 && (
                  <p className="text-muted-foreground text-sm">Tidak ada pesanan dengan status {status}.</p>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};
