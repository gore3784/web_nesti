import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const faqData = [
  {
    category: 'Pesanan & Pembayaran',
    questions: [
      {
        id: 'order-1',
        question: 'Bagaimana cara memesan?',
        answer: 'Untuk memesan, jelajahi produk kami, tambahkan barang ke keranjang, lalu lanjutkan ke checkout. Anda perlu mengisi informasi pengiriman dan detail pembayaran untuk menyelesaikan pembelian.'
      },
      {
        id: 'order-2',
        question: 'Metode pembayaran apa saja yang diterima?',
        answer: 'Kami menerima berbagai metode pembayaran termasuk kartu kredit (Visa, MasterCard), transfer bank, dan dompet digital populer seperti OVO, GoPay, dan DANA.'
      },
      {
        id: 'order-3',
        question: 'Bisakah saya mengubah atau membatalkan pesanan?',
        answer: 'Anda dapat mengubah atau membatalkan pesanan dalam 1 jam setelah melakukan pemesanan. Setelah itu, silakan hubungi tim layanan pelanggan kami untuk bantuan.'
      },
      {
        id: 'order-4',
        question: 'Bagaimana cara melacak pesanan saya?',
        answer: 'Setelah pesanan dikirim, Anda akan menerima nomor resi melalui email. Anda juga dapat memeriksa status pesanan di bagian "Riwayat Pesanan" pada akun Anda.'
      }
    ]
  },
  {
    category: 'Pengiriman & Penyerahan',
    questions: [
      {
        id: 'shipping-1',
        question: 'Berapa lama waktu pengiriman?',
        answer: 'Pengiriman standar memerlukan waktu 2–5 hari kerja untuk Jakarta dan 3–7 hari kerja untuk kota lain di Indonesia. Tersedia juga pengiriman ekspres untuk lebih cepat.'
      },
      {
        id: 'shipping-2',
        question: 'Berapa biaya pengiriman?',
        answer: 'Biaya pengiriman bervariasi tergantung lokasi dan berat paket. Gratis ongkir tersedia untuk pesanan di atas Rp500.000 di Jakarta.'
      },
      {
        id: 'shipping-3',
        question: 'Apakah Anda mengirim ke luar negeri?',
        answer: 'Saat ini kami hanya mengirimkan produk di dalam Indonesia. Kami sedang mengupayakan layanan pengiriman ke negara lain di masa mendatang.'
      },
      {
        id: 'shipping-4',
        question: 'Bagaimana jika paket saya rusak atau hilang?',
        answer: 'Jika paket Anda tiba dalam keadaan rusak atau hilang selama pengiriman, segera hubungi kami. Kami akan menyelidikinya dan memberikan penggantian atau pengembalian penuh.'
      }
    ]
  },
  {
    category: 'Pengembalian & Refund',
    questions: [
      {
        id: 'return-1',
        question: 'Bagaimana kebijakan pengembalian?',
        answer: 'Kami menawarkan kebijakan pengembalian 30 hari untuk sebagian besar produk. Produk harus dalam kondisi asli dengan label dan kemasan lengkap. Beberapa item seperti elektronik mungkin memiliki ketentuan berbeda.'
      },
      {
        id: 'return-2',
        question: 'Bagaimana cara mengembalikan barang?',
        answer: 'Untuk mengembalikan barang, buka Riwayat Pesanan Anda, pilih pesanan, dan klik "Kembalikan Barang". Ikuti petunjuk untuk mencetak label retur dan kirimkan kembali barang tersebut.'
      },
      {
        id: 'return-3',
        question: 'Kapan saya menerima pengembalian dana?',
        answer: 'Pengembalian dana diproses dalam 5–7 hari kerja setelah kami menerima barang Anda. Pengembalian dana akan dikirim ke metode pembayaran awal Anda.'
      },
      {
        id: 'return-4',
        question: 'Siapa yang membayar ongkir pengembalian?',
        answer: 'Untuk barang cacat atau salah, kami menanggung ongkir retur. Untuk pengembalian lainnya, biaya retur ditanggung pelanggan.'
      }
    ]
  },
  {
    category: 'Akun & Keamanan',
    questions: [
      {
        id: 'account-1',
        question: 'Bagaimana cara membuat akun?',
        answer: 'Klik "Daftar" di bagian atas halaman, isi data Anda termasuk nama, email, dan kata sandi. Anda akan menerima email konfirmasi untuk mengaktifkan akun Anda.'
      },
      {
        id: 'account-2',
        question: 'Saya lupa kata sandi. Apa yang harus saya lakukan?',
        answer: 'Klik "Lupa Kata Sandi" di halaman login, masukkan alamat email Anda, dan kami akan mengirimkan petunjuk untuk mereset kata sandi.'
      },
      {
        id: 'account-3',
        question: 'Bagaimana cara memperbarui informasi akun saya?',
        answer: 'Masuk ke akun Anda dan buka bagian "Profil" di mana Anda dapat memperbarui informasi pribadi, alamat pengiriman, dan preferensi.'
      },
      {
        id: 'account-4',
        question: 'Apakah informasi pribadi saya aman?',
        answer: 'Ya, kami menggunakan enkripsi dan langkah-langkah keamanan standar industri untuk melindungi informasi pribadi dan pembayaran Anda. Kami tidak membagikan data Anda tanpa izin.'
      }
    ]
  },
  {
    category: 'Produk & Stok',
    questions: [
      {
        id: 'product-1',
        question: 'Bagaimana saya tahu apakah barang tersedia?',
        answer: 'Ketersediaan stok ditampilkan di setiap halaman produk. Jika barang habis, Anda dapat mendaftar untuk mendapat notifikasi saat barang tersedia kembali.'
      },
      {
        id: 'product-2',
        question: 'Apakah foto produk akurat?',
        answer: 'Kami berusaha menampilkan foto produk yang akurat. Namun, warna bisa sedikit berbeda karena pengaturan monitor. Jika Anda tidak puas, kebijakan pengembalian berlaku.'
      },
      {
        id: 'product-3',
        question: 'Apakah ada garansi produk?',
        answer: 'Ya, barang elektronik dilengkapi garansi pabrik. Masa garansi berbeda-beda dan tercantum di halaman produk.'
      },
      {
        id: 'product-4',
        question: 'Bisakah saya meminta produk yang tidak tersedia?',
        answer: 'Tentu! Hubungi tim layanan pelanggan kami dengan permintaan Anda. Kami akan berusaha mendapatkannya untuk Anda atau menyarankan alternatif serupa.'
      }
    ]
  }
];

export const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFAQ, setFilteredFAQ] = useState(faqData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredFAQ(faqData);
      return;
    }
    const filtered = faqData.map(category => ({
      ...category,
      questions: category.questions.filter(
        faq =>
          faq.question.toLowerCase().includes(query.toLowerCase()) ||
          faq.answer.toLowerCase().includes(query.toLowerCase())
      )
    })).filter(category => category.questions.length > 0);
    setFilteredFAQ(filtered);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Pertanyaan yang Sering Diajukan</h1>
        <p className="text-muted-foreground">
          Temukan jawaban untuk pertanyaan umum seputar layanan kami
        </p>
      </div>

      {/* Pencarian */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari jawaban..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Kategori FAQ */}
      <div className="space-y-8">
        {filteredFAQ.map((category) => (
          <Card key={category.category}>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">{category.category}</h2>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFAQ.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">Tidak ditemukan hasil</h3>
            <p className="text-muted-foreground mb-4">
              Kami tidak menemukan FAQ yang sesuai dengan pencarian Anda. Coba kata kunci lain atau jelajahi kategori di atas.
            </p>
            <p className="text-sm text-muted-foreground">
              Masih ada pertanyaan? <a href="/contact" className="text-primary hover:underline">Hubungi tim support kami</a>
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
