import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TruckIcon, ClockIcon, MapPinIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export const Shipping = () => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Shipping Information</h1>
        <p className="text-muted-foreground">
          Everything you need to know about our shipping policies and delivery options
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Options */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TruckIcon className="h-5 w-5" />
                <span>Shipping Options</span>
              </CardTitle>
              <CardDescription>
                Choose the delivery speed that works best for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Standard Shipping</h4>
                  <Badge variant="secondary">Most Popular</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Reliable delivery for everyday orders
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Delivery Time:</span>
                    <p className="text-muted-foreground">2-5 business days</p>
                  </div>
                  <div>
                    <span className="font-medium">Cost:</span>
                    <p className="text-muted-foreground">{formatPrice(15000)} - {formatPrice(35000)}</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Express Shipping</h4>
                  <Badge variant="default">Fast</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Quick delivery when you need it fast
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Delivery Time:</span>
                    <p className="text-muted-foreground">1-2 business days</p>
                  </div>
                  <div>
                    <span className="font-medium">Cost:</span>
                    <p className="text-muted-foreground">{formatPrice(25000)} - {formatPrice(50000)}</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Same Day Delivery</h4>
                  <Badge variant="destructive">Jakarta Only</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Get your order on the same day (Jakarta area only)
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Delivery Time:</span>
                    <p className="text-muted-foreground">Same day</p>
                  </div>
                  <div>
                    <span className="font-medium">Cost:</span>
                    <p className="text-muted-foreground">{formatPrice(50000)} - {formatPrice(75000)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPinIcon className="h-5 w-5" />
                <span>Delivery Areas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-600">Jakarta & Surrounding Areas</h4>
                  <p className="text-sm text-muted-foreground">
                    Jakarta, Bogor, Depok, Tangerang, Bekasi (Jabodetabek)
                  </p>
                  <p className="text-sm font-medium">All shipping options available</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-blue-600">Major Cities</h4>
                  <p className="text-sm text-muted-foreground">
                    Bandung, Surabaya, Yogyakarta, Semarang, Medan, Makassar
                  </p>
                  <p className="text-sm font-medium">Standard & Express shipping</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-orange-600">Other Areas</h4>
                  <p className="text-sm text-muted-foreground">
                    All other cities and regions in Indonesia
                  </p>
                  <p className="text-sm font-medium">Standard shipping only</p>
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
                <span>Free Shipping</span>
              </CardTitle>
              <CardDescription>
                Enjoy free shipping on qualifying orders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">
                  Free Standard Shipping
                </h4>
                <p className="text-sm text-green-700">
                  Orders over {formatPrice(500000)} within Jakarta area qualify for free standard shipping.
                </p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Free Express Shipping
                </h4>
                <p className="text-sm text-blue-700">
                  Orders over {formatPrice(1000000)} within Jakarta area qualify for free express shipping.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ClockIcon className="h-5 w-5" />
                <span>Processing Time</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold">Order Processing</h4>
                <p className="text-sm text-muted-foreground">
                  Most orders are processed within 1-2 business days after payment confirmation.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold">Cut-off Times</h4>
                <p className="text-sm text-muted-foreground">
                  Orders placed before 2:00 PM on weekdays are typically processed the same day.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold">Weekends & Holidays</h4>
                <p className="text-sm text-muted-foreground">
                  Orders placed on weekends or holidays will be processed on the next business day.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Important Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold">Address Accuracy</h4>
                <p className="text-sm text-muted-foreground">
                  Please ensure your shipping address is correct. We're not responsible for packages delivered to incorrect addresses.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold">Package Tracking</h4>
                <p className="text-sm text-muted-foreground">
                  You'll receive a tracking number via email once your order ships. Track your package through our website or the courier's tracking system.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold">Delivery Attempts</h4>
                <p className="text-sm text-muted-foreground">
                  If delivery fails, the courier will attempt delivery up to 3 times. After that, the package will be returned to us.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold">Weather & Force Majeure</h4>
                <p className="text-sm text-muted-foreground">
                  Delivery times may be affected by weather conditions, natural disasters, or other circumstances beyond our control.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};