import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

export const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Silakan lengkapi semua kolom.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const messages = Object.values(data.errors).flat().join('\n');
          toast.error(messages);
        } else {
          toast.error(data.message || 'Gagal masuk.');
        }
        return;
      }

      // ✅ Simpan token
      localStorage.setItem('token', data.token);

      // ✅ Simpan user
      setUser({
        id: data.user.id,
        email: data.user.email,
        full_name: data.user.name,
        phone: data.user.phone || '',
        role: data.user.role,
        created_at: data.user.created_at || new Date().toISOString(),
      });

      toast.success('Berhasil masuk! Selamat berbelanja.');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Gagal masuk. Silakan periksa kembali data Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Selamat Datang Kembali</CardTitle>
            <CardDescription>
              Masuk ke akun Anda untuk melanjutkan berbelanja di Hinggi.id
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Alamat Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Kata Sandi</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Memproses...' : 'Masuk'}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Atau
                  </span>
                </div>
              </div>

              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  Belum punya akun?{' '}
                  <Link to="/register" className="text-primary hover:underline">
                    Daftar Sekarang
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
