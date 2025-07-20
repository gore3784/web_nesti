import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HeartIcon, ShieldCheckIcon, TruckIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export const About = () => {
  return (
    <div className="container py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Tentang Hinggi.id</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Hinggi.id adalah platform penjualan sarung adat khas NTT yang menghadirkan produk berkualitas dengan akses yang lebih luas untuk Anda.
        </p>
      </div>

      {/* Company Story */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Kisah Kami</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <p className="text-muted-foreground mb-4">
            Didirikan pada tahun 2020, Hinggi.id hadir dengan misi sederhana: 
            memperkenalkan dan memajukan sarung adat khas Nusa Tenggara Timur agar lebih dikenal luas. 
            Berawal dari tim kecil yang mencintai budaya lokal, Hinggi.id kini berkembang menjadi salah satu platform terpercaya untuk produk tenun khas Indonesia.
          </p>
          <p className="text-muted-foreground mb-4">
            Kami percaya berbelanja online harus terasa mudah, aman, dan menyenangkan. Karena itu, kami membangun platform ini dengan teknologi terkini dan pendekatan yang selalu mengutamakan kepuasan Anda.
          </p>
          <p className="text-muted-foreground">
            Saat ini, kami melayani ribuan pelanggan di berbagai daerah, menawarkan koleksi sarung adat pilihan dengan kualitas terbaik. Komitmen kami terhadap mutu dan pelayanan yang ramah telah menjadikan Hinggi.id pilihan utama untuk Anda yang bangga dengan warisan budaya.
          </p>
        </CardContent>
      </Card>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HeartIcon className="h-6 w-6 text-primary" />
              <span>Misi Kami</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Memberikan pengalaman berbelanja yang luar biasa dengan menghadirkan sarung adat berkualitas, harga yang wajar, dan layanan yang tulus kepada setiap pelanggan.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShieldCheckIcon className="h-6 w-6 text-primary" />
              <span>Visi Kami</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Menjadi platform penjualan sarung adat NTT yang paling dipercaya dan inovatif, menghubungkan Anda dengan produk budaya yang istimewa sekaligus mendukung pengrajin lokal.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Core Values */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Nilai-Nilai Utama</CardTitle>
          <CardDescription>
            Prinsip yang memandu setiap langkah kami
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Kepercayaan & Keamanan</h3>
              <p className="text-sm text-muted-foreground">
                Kami melindungi informasi pribadi Anda dan memastikan setiap transaksi aman.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Pelanggan Utama</h3>
              <p className="text-sm text-muted-foreground">
                Kepuasan Anda adalah prioritas kami dalam setiap layanan.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TruckIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Layanan Berkualitas</h3>
              <p className="text-sm text-muted-foreground">
                Kami memastikan layanan dari pemesanan hingga pengiriman selalu memuaskan.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Komunitas</h3>
              <p className="text-sm text-muted-foreground">
                Kami membangun hubungan jangka panjang dengan komunitas pengrajin dan pelanggan.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Dampak Kami</CardTitle>
          <CardDescription>
            Angka-angka yang mencerminkan komitmen kami
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <p className="text-sm text-muted-foreground">Pelanggan Bahagia</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <p className="text-sm text-muted-foreground">Produk Tersedia</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100+</div>
              <p className="text-sm text-muted-foreground">Kota Terjangkau</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99.5%</div>
              <p className="text-sm text-muted-foreground">Kepuasan Pelanggan</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact CTA */}
      <Card className="text-center">
        <CardContent className="py-8">
          <h2 className="text-2xl font-bold mb-4">Siap Berbelanja Bersama Kami?</h2>
          <p className="text-muted-foreground mb-6">
            Bergabunglah dengan ribuan pelanggan yang puas dan rasakan pengalaman berbelanja berbeda di Hinggi.id.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/products">Mulai Belanja</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/contact">Hubungi Kami</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
