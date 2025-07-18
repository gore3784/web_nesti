import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Building, Truck, Smartphone, Wallet } from 'lucide-react';

interface PaymentMethodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMethod: string;
  onMethodSelect: (method: string) => void;
  onConfirm: () => void;
}

interface PaymentOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: 'bank' | 'ewallet' | 'card' | 'cod' | 'va' | 'qris';
}

const paymentOptions: PaymentOption[] = [
  // Bank Transfer
  {
    id: 'bank_bca',
    name: 'Bank BCA',
    description: 'Transfer ke rekening Bank BCA',
    icon: <Building className="h-5 w-5 text-blue-600" />,
    category: 'bank'
  },
  {
    id: 'bank_mandiri',
    name: 'Bank Mandiri',
    description: 'Transfer ke rekening Bank Mandiri',
    icon: <Building className="h-5 w-5 text-blue-800" />,
    category: 'bank'
  },
  {
    id: 'bank_bri',
    name: 'Bank BRI',
    description: 'Transfer ke rekening Bank BRI',
    icon: <Building className="h-5 w-5 text-blue-700" />,
    category: 'bank'
  },
  {
    id: 'bank_bni',
    name: 'Bank BNI',
    description: 'Transfer ke rekening Bank BNI',
    icon: <Building className="h-5 w-5 text-orange-600" />,
    category: 'bank'
  },
  
  // QRIS
  {
    id: 'qris',
    name: 'QRIS',
    description: 'Quick Response Code Indonesian Standard',
    icon: <Smartphone className="h-5 w-5 text-blue-600" />,
    category: 'qris'
  },

  // E-Wallet
  {
    id: 'gopay',
    name: 'GoPay',
    description: 'Bayar dengan GoPay',
    icon: <Smartphone className="h-5 w-5 text-green-600" />,
    category: 'ewallet'
  },
  {
    id: 'ovo',
    name: 'OVO',
    description: 'Bayar dengan OVO',
    icon: <Smartphone className="h-5 w-5 text-purple-600" />,
    category: 'ewallet'
  },
  {
    id: 'dana',
    name: 'DANA',
    description: 'Bayar dengan DANA',
    icon: <Smartphone className="h-5 w-5 text-blue-500" />,
    category: 'ewallet'
  },
  {
    id: 'shopeepay',
    name: 'ShopeePay',
    description: 'Bayar dengan ShopeePay',
    icon: <Smartphone className="h-5 w-5 text-orange-500" />,
    category: 'ewallet'
  },
  {
    id: 'linkaja',
    name: 'LinkAja',
    description: 'Bayar dengan LinkAja',
    icon: <Smartphone className="h-5 w-5 text-red-600" />,
    category: 'ewallet'
  },

  // Virtual Account
  {
    id: 'va_bca',
    name: 'Virtual Account BCA',
    description: 'Bayar melalui Virtual Account BCA',
    icon: <Wallet className="h-5 w-5 text-blue-600" />,
    category: 'va'
  },
  {
    id: 'va_mandiri',
    name: 'Virtual Account Mandiri',
    description: 'Bayar melalui Virtual Account Mandiri',
    icon: <Wallet className="h-5 w-5 text-blue-800" />,
    category: 'va'
  },
  {
    id: 'va_bri',
    name: 'Virtual Account BRI',
    description: 'Bayar melalui Virtual Account BRI',
    icon: <Wallet className="h-5 w-5 text-blue-700" />,
    category: 'va'
  },

  // Credit Card
  {
    id: 'credit_card',
    name: 'Kartu Kredit',
    description: 'Visa, Mastercard, JCB',
    icon: <CreditCard className="h-5 w-5 text-gray-700" />,
    category: 'card'
  },

  // Cash on Delivery
  {
    id: 'cod',
    name: 'Bayar di Tempat (COD)',
    description: 'Bayar saat barang tiba',
    icon: <Truck className="h-5 w-5 text-green-700" />,
    category: 'cod'
  }
];

const categoryNames = {
  qris: 'QRIS',
  bank: 'Transfer Bank',
  ewallet: 'E-Wallet',
  va: 'Virtual Account',
  card: 'Kartu Kredit',
  cod: 'Bayar di Tempat'
};

export const PaymentMethodModal = ({ 
  open, 
  onOpenChange, 
  selectedMethod, 
  onMethodSelect, 
  onConfirm 
}: PaymentMethodModalProps) => {
  const [tempSelectedMethod, setTempSelectedMethod] = useState(selectedMethod);

  const handleConfirm = () => {
    onMethodSelect(tempSelectedMethod);
    onConfirm();
    onOpenChange(false);
  };

  const groupedOptions = paymentOptions.reduce((acc, option) => {
    if (!acc[option.category]) {
      acc[option.category] = [];
    }
    acc[option.category].push(option);
    return acc;
  }, {} as Record<string, PaymentOption[]>);

  const getSelectedOptionName = () => {
    const option = paymentOptions.find(opt => opt.id === tempSelectedMethod);
    return option ? option.name : 'Pilih metode pembayaran';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Pilih Metode Pembayaran</DialogTitle>
        </DialogHeader>
        
        <div className="overflow-y-auto flex-1 pr-2 -mr-2">
          <RadioGroup 
            value={tempSelectedMethod} 
            onValueChange={setTempSelectedMethod}
            className="space-y-6"
          >
            {Object.entries(groupedOptions).map(([category, options]) => (
              <div key={category}>
                <h3 className="font-semibold text-lg mb-3 text-primary">
                  {categoryNames[category as keyof typeof categoryNames]}
                </h3>
                <div className="space-y-2">
                  {options.map((option) => (
                    <Card key={option.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex items-center space-x-3 p-4 cursor-pointer hover:bg-accent/50 transition-colors">
                          <RadioGroupItem value={option.id} id={option.id} />
                          {option.icon}
                          <div className="flex-1">
                            <Label htmlFor={option.id} className="cursor-pointer font-medium">
                              {option.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {option.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {category !== 'cod' && <Separator className="mt-4" />}
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex flex-col space-y-4 pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Metode terpilih:</span>
            <span className="font-medium">{getSelectedOptionName()}</span>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Batal
            </Button>
            <Button 
              onClick={handleConfirm}
              disabled={!tempSelectedMethod}
              className="flex-1"
            >
              Konfirmasi
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};