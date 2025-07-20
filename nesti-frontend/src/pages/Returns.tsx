import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowPathIcon, ShieldCheckIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export const Returns = () => {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Pengembalian & Pengembalian Dana</h1>
        <p className="text-muted-foreground">
          Kebijakan pengembalian bebas repot kami memastikan kepuasan Anda di setiap pembelian
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Return Policy */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ArrowPathIcon className="h-5 w-5" />
                <span>Ringkasan Kebijakan Pengembalian</span>
              </CardTitle>
              <CardDescription>
                Hal-hal yang perlu Anda ketahui tentang pengembalian barang
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Batas Waktu 30 Hari</h4>
                <p className="text-sm text-green-700">
                  Anda memiliki waktu 30 hari sejak tanggal pengiriman untuk mengembalikan sebagian besar barang untuk pengembalian dana penuh.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Apa Saja yang Bisa Dikembalikan?</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Barang dalam kondisi asli dengan label</li>
                  <li>• Elektronik yang belum dibuka dalam kemasan asli</li>
                  <li>• Pakaian dan aksesori (belum dipakai, dengan label)</li>
                  <li>• Buku dan media (belum dibuka/dipakai)</li>
                  <li>• Perlengkapan rumah (belum digunakan)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Syarat Pengembalian</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Barang harus dalam kemasan asli</li>
                  <li>• Semua aksesori dan buku panduan harus lengkap</li>
                  <li>• Tidak ada tanda penggunaan atau kerusakan</li>
                  <li>• Sertakan struk asli atau konfirmasi pesanan</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ExclamationTriangleIcon className="h-5 w-5" />
                <span>Barang yang Tidak Dapat Dikembalikan</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-red-700 font-medium mb-2">
                  Barang-barang berikut tidak dapat dikembalikan karena alasan higienis dan keamanan:
                </p>
                <ul className="text-sm text-red-600 space-y-1">
                  <li>• Produk perawatan pribadi (sudah dibuka)</li>
                  <li>• Pakaian dalam dan pakaian renang</li>
                  <li>• Makanan dan suplemen</li>
                  <li>• Barang kustom atau dengan personalisasi</li>
                  <li>• Perangkat lunak dan unduhan digital</li>
                  <li>• Barang yang rusak karena penyalahgunaan</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Kasus Khusus</h4>
                <p className="text-sm text-muted-foreground">
                  Beberapa elektronik dan peralatan rumah tangga mungkin memiliki masa pengembalian berbeda. 
                  Periksa halaman produk atau hubungi layanan pelanggan untuk barang tertentu.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Return Process */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cara Mengembalikan Barang</CardTitle>
              <CardDescription>
                Langkah sederhana untuk mengembalikan pembelian Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Ajukan Pengembalian</h4>
                    <p className="text-sm text-muted-foreground">
                      Masuk ke "Riwayat Pesanan" di akun Anda dan pilih "Kembalikan Barang" untuk produk yang ingin Anda kembalikan.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Cetak Label Pengembalian</h4>
                    <p className="text-sm text-muted-foreground">
                      Unduh dan cetak label pengembalian prabayar yang akan kami kirimkan melalui email.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Kemas Barang</h4>
                    <p className="text-sm text-muted-foreground">
                      Kemas barang dengan aman dalam kemasan asli beserta semua aksesori dan tempelkan label pengembalian.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold">Kirimkan Paket</h4>
                    <p className="text-sm text-muted-foreground">
                      Serahkan ke titik pengambilan kurir terdekat atau jadwalkan penjemputan dari lokasi Anda.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <Button className="w-full">
                  Mulai Proses Pengembalian
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ClockIcon className="h-5 w-5" />
                <span>Lini Waktu Pengembalian Dana</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Waktu Proses</h4>
                  <Badge variant="secondary">2-3 Hari</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Setelah kami menerima barang, kami akan memeriksa dan memproses pengembalian dana Anda.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Metode Pengembalian Dana</h4>
                  <Badge variant="outline">Pembayaran Asli</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Dana akan dikembalikan ke metode pembayaran asli Anda (kartu kredit, rekening bank, dll.).
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Proses Bank</h4>
                  <Badge variant="secondary">3-7 Hari</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Bank atau penyedia pembayaran Anda mungkin membutuhkan waktu tambahan untuk memproses pengembalian dana.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShieldCheckIcon className="h-5 w-5" />
                <span>Pengiriman Pengembalian</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold text-green-600">Gratis Ongkir Pengembalian</h4>
                <p className="text-sm text-muted-foreground">
                  Kami menanggung ongkos kirim untuk barang cacat, salah kirim, atau kesalahan dari pihak kami.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-orange-600">Biaya Ditanggung Pelanggan</h4>
                <p className="text-sm text-muted-foreground">
                  Untuk pengembalian karena perubahan pikiran atau masalah ukuran, ongkos kirim ditanggung pelanggan.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-700">
                  <strong>Tips:</strong> Pertimbangkan untuk menukar ukuran atau warna lain untuk menghindari biaya ongkir pengembalian!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Butuh Bantuan Pengembalian?</CardTitle>
          <CardDescription>
            Tim layanan pelanggan kami siap membantu Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Dukungan Email</h4>
              <p className="text-sm text-muted-foreground">returns@Hinggi.id.com</p>
              <p className="text-xs text-muted-foreground">Respon dalam 24 jam</p>
            </div>

            <div className="text-center">
              <h4 className="font-semibold mb-2">Dukungan Telepon</h4>
              <p className="text-sm text-muted-foreground">+62 21 1234 5678</p>
              <p className="text-xs text-muted-foreground">Sen-Jum, 09.00-18.00</p>
            </div>

            <div className="text-center">
              <h4 className="font-semibold mb-2">Live Chat</h4>
              <p className="text-sm text-muted-foreground">Tersedia di website</p>
              <p className="text-xs text-muted-foreground">Sen-Jum, 09.00-18.00</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};