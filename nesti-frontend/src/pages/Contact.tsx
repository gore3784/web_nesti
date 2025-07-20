import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Terima kasih atas pesan Anda! Kami akan segera menghubungi Anda.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Hubungi Kami</h1>
        <p className="text-muted-foreground">
          Terhubung dengan tim layanan pelanggan kami
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulir Kontak */}
        <Card>
          <CardHeader>
            <CardTitle>Kirim Pesan kepada Kami</CardTitle>
            <CardDescription>
              Isi formulir di bawah ini dan kami akan menghubungi Anda secepatnya.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nama Lengkap
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Alamat Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Masukkan email Anda"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subjek
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Tuliskan topik pesan Anda"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Pesan
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tuliskan pesan Anda di sini..."
                  rows={6}
                />
              </div>
              
              <Button type="submit" className="w-full">
                Kirim Pesan
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Informasi Kontak */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Kontak</CardTitle>
              <CardDescription>
                Berbagai cara untuk menghubungi kami
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <PhoneIcon className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold">Telepon</h4>
                  <p className="text-muted-foreground">+62 21 1234 5678</p>
                  <p className="text-sm text-muted-foreground">Senin-Jumat, 09.00–18.00</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-muted-foreground">support@Hinggi.id.com</p>
                  <p className="text-sm text-muted-foreground">Kami membalas dalam 24 jam</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPinIcon className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold">Alamat</h4>
                  <p className="text-muted-foreground">
                    Jl. Komodo No. 123<br />
                    Sumba Timur<br />
                    NTT
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <ClockIcon className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold">Jam Operasional</h4>
                  <p className="text-muted-foreground">
                    Senin - Jumat: 09.00 - 18.00<br />
                    Sabtu: 10.00 - 16.00<br />
                    Minggu: Tutup
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pertanyaan Umum</CardTitle>
              <CardDescription>
                Jawaban cepat untuk pertanyaan umum
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-sm">Berapa lama waktu pengiriman?</h4>
                  <p className="text-sm text-muted-foreground">Biasanya 2–5 hari kerja di dalam Indonesia.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Bagaimana kebijakan pengembalian?</h4>
                  <p className="text-sm text-muted-foreground">Kebijakan pengembalian 30 hari untuk sebagian besar produk.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Apakah Anda melayani pengiriman internasional?</h4>
                  <p className="text-sm text-muted-foreground">Saat ini kami hanya melayani pengiriman dalam Indonesia.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
