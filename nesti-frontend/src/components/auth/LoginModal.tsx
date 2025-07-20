import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToRegister: () => void;
}

export const LoginModal = ({ open, onOpenChange, onSwitchToRegister }: LoginModalProps) => {
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
      toast.error('Harap isi semua kolom');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login error:', errorData);
        toast.error(
          errorData.message ||
          (errorData.errors ? JSON.stringify(errorData.errors) : 'Login gagal.')
        );
        return;
      }

      const data = await response.json();

      localStorage.setItem('token', data.token);

      setUser({
        id: data.user.id,
        email: data.user.email,
        full_name: data.user.name,
        role: data.user.role,
        created_at: data.user.created_at,
      });

      toast.success('Login berhasil!');
      onOpenChange(false);
      navigate('/');
    } catch (error) {
      console.error('Network error:', error);
      toast.error('Login gagal. Periksa kembali data Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Selamat Datang Kembali</DialogTitle>
          <DialogDescription className="text-center">
            Masuk ke akun Anda untuk melanjutkan berbelanja
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Sedang masuk...' : 'Masuk'}
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
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  onSwitchToRegister();
                }}
                className="text-primary hover:underline"
              >
                Daftar
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
