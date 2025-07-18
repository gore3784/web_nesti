import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Save, Mail, Bell, Shield, Database } from 'lucide-react';

export const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your store configuration</p>
      </div>

      <div className="grid gap-6">
        {/* Store Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Store Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="store-name">Store Name</Label>
                <Input id="store-name" defaultValue="Hinggi.id" />
              </div>
              <div>
                <Label htmlFor="store-email">Store Email</Label>
                <Input id="store-email" type="email" defaultValue="admin@hinggi.id" />
              </div>
            </div>
            <div>
              <Label htmlFor="store-description">Store Description</Label>
              <Textarea 
                id="store-description" 
                defaultValue="Your premier destination for quality products and exceptional service."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="store-phone">Phone Number</Label>
                <Input id="store-phone" defaultValue="+62 21 1234 5678" />
              </div>
              <div>
                <Label htmlFor="store-address">Address</Label>
                <Input id="store-address" defaultValue="Jalan Mawar No. 12, Kelurahan Ringgi, Sumba Timur" />
              </div>
            </div>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Store Information
            </Button>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="smtp-host">SMTP Host</Label>
                <Input id="smtp-host" placeholder="smtp.gmail.com" />
              </div>
              <div>
                <Label htmlFor="smtp-port">SMTP Port</Label>
                <Input id="smtp-port" placeholder="587" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="smtp-username">Username</Label>
                <Input id="smtp-username" placeholder="your-email@gmail.com" />
              </div>
              <div>
                <Label htmlFor="smtp-password">Password</Label>
                <Input id="smtp-password" type="password" placeholder="••••••••" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="email-notifications" />
              <Label htmlFor="email-notifications">Enable email notifications</Label>
            </div>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Email Settings
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>New Order Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications for new orders</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Low Stock Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get alerted when products are low in stock</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Customer Registration</Label>
                  <p className="text-sm text-muted-foreground">Notifications for new customer registrations</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Payment Confirmations</Label>
                  <p className="text-sm text-muted-foreground">Notifications for payment confirmations</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              System Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="currency">Default Currency</Label>
                <Input id="currency" defaultValue="IDR" disabled />
              </div>
              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Input id="timezone" defaultValue="Asia/Makassar" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable maintenance mode for the store</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable debug mode for development</p>
                </div>
                <Switch />
              </div>
            </div>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save System Settings
            </Button>
          </CardContent>
        </Card>

        {/* Backup Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Backup & Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Database Backup</h4>
                <p className="text-sm text-muted-foreground">Create a backup of your database</p>
              </div>
              <Button variant="outline">Create Backup</Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Export Data</h4>
                <p className="text-sm text-muted-foreground">Export products and orders data</p>
              </div>
              <Button variant="outline">Export Data</Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Clear Cache</h4>
                <p className="text-sm text-muted-foreground">Clear application cache</p>
              </div>
              <Button variant="outline">Clear Cache</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}