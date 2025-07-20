import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

interface RegisterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin: () => void;
}

export const RegisterModal = ({ open, onOpenChange, onSwitchToLogin }: RegisterModalProps) => {
  const navigate = useNavigate();
  const { setUser } = useStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm_password: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.full_name || !formData.email || !formData.password || !formData.confirm_password) {
      toast.error('Harap isi semua kolom');
      return;
    }
    if (formData.password !== formData.confirm_password) {
      toast.error('Password tidak sama');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password harus minimal 6 karakter');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.full_name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirm_password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(
          errorData.message ||
          (errorData.errors ? JSON.stringify(errorData.errors) : 'Pendaftaran gagal.')
        );
        return;
      }

      await response.json();

      const loginResponse = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!loginResponse.ok) {
        toast.success('Akun berhasil dibuat! Silakan login.');
        onOpenChange(false);
        navigate('/login');
        return;
      }

      const loginData = await loginResponse.json();

      localStorage.setItem('token', loginData.token);

      setUser({
        id: loginData.user.id,
        email: loginData.user.email,
        full_name: loginData.user.name,
        role: loginData.user.role,
        created_at: loginData.user.created_at,
      });

      toast.success('Akun berhasil dibuat & login!');
      onOpenChange(false);
      navigate('/');

    } catch (error) {
      console.error('Network error:', error);
      toast.error('Pendaftaran gagal. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Buat Akun</DialogTitle>
          <DialogDescription className="text-center">
            Daftar untuk mulai berbelanja bersama kami
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="full_name">Nama Lengkap</Label>
            <Input
              id="full_name"
              type="text"
              value={formData.full_name}
              onChange={(e) => handleInputChange('full_name', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
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

          <div>
            <Label htmlFor="confirm_password">Konfirmasi Kata Sandi</Label>
            <Input
              id="confirm_password"
              type="password"
              value={formData.confirm_password}
              onChange={(e) => handleInputChange('confirm_password', e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Membuat Akun...' : 'Buat Akun'}
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
              Sudah punya akun?{' '}
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false); // tutup modal register dulu
                  onSwitchToLogin();   // lalu jalankan switch
                }}
                className="text-primary hover:underline"
              >
                Masuk
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
