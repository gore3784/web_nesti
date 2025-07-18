import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HeartIcon, ShieldCheckIcon, TruckIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export const About = () => {
  return (
    <div className="container py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">About Hinggi.id</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Hinggi.id adalah toko online yang menyediakan berbagai produk dengan harga terjangkau.
        </p>
      </div>

      {/* Company Story */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Our Story</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <p className="text-muted-foreground mb-4">
            Didirikan pada tahun 2020, Hinggi.id dimulai sebagai pasar online kecil dengan misi sederhana: 
            membuat produk berkualitas dapat dijangkau oleh semua orang di seluruh Indonesia. Apa yang 
            dimulai sebagai tim entrepreneur berpengalaman telah tumbuh menjadi salah satu platform 
            e-commerce yang paling dipercaya di negara ini.
          </p>
          <p className="text-muted-foreground mb-4">
            Kami percaya bahwa berbelanja online harus mudah, aman, dan menyenangkan. Oleh karena itu, 
            kami telah membangun platform kami dengan teknologi terdepan dan pendekatan pelanggan 
            yang menempatkan kepuasan Anda di jantung segala sesuatu yang kami lakukan.
          </p>
          <p className="text-muted-foreground">
            Hari ini, kami melayani ribuan pelanggan di seluruh negeri, menawarkan segala sesuatu dari 
            elektronik dan fashion hingga perlengkapan rumah dan buku. Komitmen kami terhadap kualitas, 
            harga yang kompetitif, dan layanan pelanggan yang luar biasa telah menjadikan kami pilihan 
            terbaik untuk pembeli online.
          </p>
        </CardContent>
      </Card>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HeartIcon className="h-6 w-6 text-primary" />
              <span>Our Mission</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Memberikan pengalaman berbelanja online yang luar biasa dengan menawarkan produk berkualitas, 
              harga yang kompetitif, dan layanan pelanggan yang luar biasa.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShieldCheckIcon className="h-6 w-6 text-primary" />
              <span>Our Vision</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Menjadi platform e-commerce yang paling dipercaya dan inovatif di Indonesia, menghubungkan 
              orang dengan produk yang mereka sukai sementara membangun hubungan yang panjang dengan komunitas kami.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Core Values */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Our Core Values</CardTitle>
          <CardDescription>
            The principles that guide everything we do
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Trust & Security</h3>
              <p className="text-sm text-muted-foreground">
                Kami melindungi informasi pribadi Anda dan memastikan transaksi yang aman.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Customer First</h3>
              <p className="text-sm text-muted-foreground">
                Kepuasan pelanggan adalah prioritas kami dalam setiap interaksi.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TruckIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Quality Service</h3>
              <p className="text-sm text-muted-foreground">
                Kami memberikan layanan yang luar biasa dari pencarian hingga pengiriman.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Community</h3>
              <p className="text-sm text-muted-foreground">
                Kami membangun hubungan yang panjang dengan komunitas kami.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Our Impact</CardTitle>
          <CardDescription>
            Numbers that reflect our commitment to excellence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <p className="text-sm text-muted-foreground">Products Available</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100+</div>
              <p className="text-sm text-muted-foreground">Cities Served</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99.5%</div>
              <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Section */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Leadership Team</CardTitle>
          <CardDescription>
            Meet the people behind Hinggi.id
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                AS
              </div>
              <h3 className="font-semibold">Ahmad Suharto</h3>
              <p className="text-sm text-primary mb-2">Chief Executive Officer</p>
              <p className="text-sm text-muted-foreground">
                15+ tahun pengalaman dalam pengelolaan e-commerce dan teknologi.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                DP
              </div>
              <h3 className="font-semibold">Dewi Pratiwi</h3>
              <p className="text-sm text-primary mb-2">Chief Technology Officer</p>
              <p className="text-sm text-muted-foreground">
                Expert in building scalable platforms and user experience design.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                BI
              </div>
              <h3 className="font-semibold">Budi Irawan</h3>
              <p className="text-sm text-primary mb-2">Chief Operating Officer</p>
              <p className="text-sm text-muted-foreground">
                Specialist in operations, logistics, and customer service excellence.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Awards & Recognition */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Awards & Recognition</CardTitle>
          <CardDescription>
            Acknowledgments of our commitment to excellence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <Badge variant="default" className="bg-yellow-500">2023</Badge>
              <div>
                <h4 className="font-semibold">Best E-commerce Platform</h4>
                <p className="text-sm text-muted-foreground">Indonesia Digital Awards</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="default" className="bg-blue-500">2023</Badge>
              <div>
                <h4 className="font-semibold">Customer Service Excellence</h4>
                <p className="text-sm text-muted-foreground">National Customer Service Awards</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="default" className="bg-green-500">2022</Badge>
              <div>
                <h4 className="font-semibold">Top 10 Fastest Growing Startup</h4>
                <p className="text-sm text-muted-foreground">TechInAsia Awards</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="default" className="bg-purple-500">2022</Badge>
              <div>
                <h4 className="font-semibold">Innovation in Technology</h4>
                <p className="text-sm text-muted-foreground">Indonesian Startup Awards</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact CTA */}
      <Card className="text-center">
        <CardContent className="py-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Shop with Us?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of satisfied customers and experience the difference of shopping with Hinggi.id.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/products">Start Shopping</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};