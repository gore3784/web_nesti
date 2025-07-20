import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store/useStore'
import { ShippingAddress } from '@/types'
import { toast } from 'sonner'
import axios from '@/lib/axios'

interface MidtransResponse {
  snapToken: string
  order_id: string
}

interface WilayahItem {
  code: string
  name: string
}

export const Checkout = () => {
  const navigate = useNavigate()
  const { cartItems, getCartTotal, clearCart } = useStore()
  const [loading, setLoading] = useState(false)
  const [snapReady, setSnapReady] = useState(false)

  // data wilayah
  const [provinces, setProvinces] = useState<WilayahItem[]>([])
  const [regencies, setRegencies] = useState<WilayahItem[]>([])

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    full_name: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    province: '',
  })

  useEffect(() => {
    const loadProvinces = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/proxy/provinces')
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }
        const json = await res.json()
        setProvinces(json.data)
      } catch (err) {
        console.error('Fetch provinces error:', err)
        toast.error('Gagal memuat provinsi')
      }
    }

    loadProvinces()
    if ((window as any).snap) setSnapReady(true)
  }, [])

  const handleProvinceChange = (provCode: string) => {
    setShippingAddress(prev => ({ ...prev, province: provCode, city: '' }))
    if (!provCode) {
      setRegencies([])
      return
    }
    fetch(`http://localhost:8000/api/proxy/regencies/${provCode}`)
      .then(res => res.json())
      .then(json => setRegencies(json.data))
      .catch(() => toast.error('Gagal memuat kabupaten/kota'))
  }

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }))
  }

  // hitung total
  const subtotal = getCartTotal()
  const shippingCost = shippingAddress.province === '53' ? 50000 : 100000
  const grandTotal = subtotal + shippingCost

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const required: (keyof ShippingAddress)[] = [
      'full_name',
      'phone',
      'address',
      'city',
      'postal_code',
      'province'
    ]
    for (const field of required) {
      if (!shippingAddress[field]?.toString().trim()) {
        toast.error(`Please fill in ${field.replace('_', ' ')}`)
        return
      }
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty.')
      return
    }

    if (!snapReady) {
      toast.error('Payment system not ready. Snap JS belum termuat.')
      return
    }

    setLoading(true)
    try {
      // 👉 gabungkan items barang dengan shipping sebagai item baru
      const itemsWithShipping = [
        ...cartItems.map(item => ({
          id: item.product.id,
          price: item.product.price,
          quantity: item.quantity,
          name: item.product.name,
        })),
        {
          id: 'SHIPPING',
          price: shippingCost,
          quantity: 1,
          name: 'Biaya Pengiriman',
        },
      ]

      const res = await axios.post<MidtransResponse>('/api/payments/midtrans', {
        shipping_address: shippingAddress,
        total_amount: grandTotal,
        email: 'user@example.com',
        items: itemsWithShipping,
      })

      const snapToken = res.data.snapToken
      // @ts-ignore
      window.snap.pay(snapToken, {
        onSuccess: async (result: any) => {
          try {
            // update transaksi
            await axios.post('/api/orders/update-transaction', {
              order_number: result.order_id,
              transaction_id: result.transaction_id,
            });

            // ✅ kurangi stok produk
            await axios.post('/api/products/decrease-stock', {
              items: cartItems.map(item => ({
                id: item.product.id,
                quantity: item.quantity,
              })),
            });

            toast.success('Pembayaran berhasil, stok diperbarui!');
          } catch (err) {
            console.error(err);
            toast.error('Pembayaran berhasil, tapi gagal update transaksi atau stok.');
          }

          clearCart();
          navigate('/orders');
        },

        onPending: () => toast('Pembayaran sedang diproses.'),
        onError: () => toast.error('Terjadi kesalahan saat pembayaran.'),
        onClose: () => console.log('Popup pembayaran ditutup.')
      })
    } catch (error: any) {
      console.error('Checkout error:', error.response?.data || error.message)
      toast.error(error.response?.data?.message || 'Failed to start payment.')
    } finally {
      setLoading(false)
    }
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">No Items to Checkout</h1>
          <p className="text-muted-foreground mb-8">
            Your cart is empty. Add some items to proceed with checkout.
          </p>
          <Button asChild size="lg">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 📦 Form alamat pengiriman */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input id="full_name"
                      value={shippingAddress.full_name}
                      onChange={e => handleInputChange('full_name', e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone"
                      value={shippingAddress.phone}
                      onChange={e => handleInputChange('phone', e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input id="address"
                    value={shippingAddress.address}
                    onChange={e => handleInputChange('address', e.target.value)} />
                </div>

                {/* Provinsi dropdown */}
                <div>
                  <Label htmlFor="province">Provinsi *</Label>
                  <select
                    id="province"
                    className="border rounded-md p-2 w-full"
                    value={shippingAddress.province}
                    onChange={(e) => handleProvinceChange(e.target.value)}
                  >
                    <option value="">Pilih Provinsi</option>
                    {provinces.map((p) => (
                      <option key={p.code} value={p.code}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Kabupaten dropdown */}
                <div>
                  <Label htmlFor="city">Kabupaten/Kota *</Label>
                  <select
                    id="city"
                    className="border rounded-md p-2 w-full"
                    value={shippingAddress.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  >
                    <option value="">Pilih Kabupaten/Kota</option>
                    {regencies.map((k) => (
                      <option key={k.code} value={k.name}>
                        {k.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="postal_code">Postal Code *</Label>
                  <Input id="postal_code"
                    value={shippingAddress.postal_code}
                    onChange={e => handleInputChange('postal_code', e.target.value)} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 💳 Ringkasan order */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.product.name} × {item.quantity}</span>
                      <span>{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formatPrice(shippingCost)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
                <Button type="submit" className="w-full mt-4" disabled={loading}>
                  {loading ? 'Processing…' : 'Pay Now'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
