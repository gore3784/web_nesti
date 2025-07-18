import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import { UserIcon, KeyIcon, ShoppingBagIcon, HeartIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store/useStore'
import { toast } from 'sonner'
import type { User } from '@/types'

export const Profile = () => {
  const { user, setUser, cartItems, wishlistItems } = useStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ full_name: '', email: '', phone: '' })
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [orders, setOrders] = useState<any[]>([])
  const [loadingOrders, setLoadingOrders] = useState(false)

  // Load profile
  useEffect(() => {
    axios.get<User>('/api/profile')
      .then((res) => {
        const u = res.data
        setUser(u)
        setFormData({
          full_name: u.full_name || '',
          email: u.email || '',
          phone: u.phone || '',
        })
      })
      .catch((err) => {
        console.error('Profile load error:', err.response?.status, err.response?.data || err.message)
        toast.error('Failed to load profile')
      })
  }, [setUser])

  // Load orders
  useEffect(() => {
    if (!user) return;
    setLoadingOrders(true);
  
    axios.get<any[]>('/api/orders')
      .then((res) => {
        setOrders(res.data || []);
      })
      .catch((err) => {
        console.error('Orders load error:', err.response?.status, err.response?.data || err.message);
        toast.error('Failed to load orders');
      })
      .then(() => {
        setLoadingOrders(false); // ganti dari .finally ke .then
      });
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.put<{ message: string; user: User }>('/api/profile', {
        full_name: formData.full_name,
        phone: formData.phone,
      })
      setUser(res.data.user)
      toast.success(res.data.message || 'Profile updated successfully')
      setIsEditing(false)
    } catch (err: any) {
      console.error('Update profile error:', err.response?.status, err.response?.data || err.message)
      toast.error(err.response?.data?.message || 'Failed to update profile')
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }
    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    try {
      const res = await axios.put<{ message: string }>('/api/profile/password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        newPassword_confirmation: passwordData.confirmPassword,
      })
      toast.success(res.data.message || 'Password changed successfully')
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err: any) {
      console.error('Change password error:', err.response?.status, err.response?.data || err.message)
      toast.error(err.response?.data?.message || 'Failed to change password')
    }
  }

  if (!user) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <UserIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-3xl font-bold mb-4">Please Login</h1>
          <p className="text-muted-foreground mb-8">
            You need to be logged in to access your profile.
          </p>
          <Button asChild size="lg">
            <a href="/login">Login</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Account</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* PROFILE */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Profile Information</CardTitle>
                <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={formData.email} disabled className="bg-muted" />
                    <p className="text-sm text-muted-foreground mt-1">Email cannot be changed</p>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!isEditing}
                      placeholder="+62 812 3456 7890"
                    />
                  </div>
                  <div>
                    <Label>Member Since</Label>
                    <Input value={new Date(user.created_at).toLocaleDateString()} disabled className="bg-muted" />
                  </div>
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <Button type="submit">Save Changes</Button>
                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SECURITY */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyIcon className="h-5 w-5" />
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    required
                    minLength={6}
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    required
                    minLength={6}
                  />
                </div>
                <Button type="submit">Change Password</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ORDERS */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBagIcon className="h-5 w-5" />
                Order History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingOrders ? (
                <p className="text-muted-foreground">Loading orders...</p>
              ) : orders.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBagIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No orders yet</p>
                  <p className="text-sm text-muted-foreground mb-4">Start shopping to see your order history here</p>
                  <Button asChild>
                    <a href="/products">Browse Products</a>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 hover:bg-accent">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{order.status}</p>
                          <p className="text-sm text-muted-foreground">
                            Total: Rp {order.total_amount?.toLocaleString('id-ID')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ACTIVITY */}
        <TabsContent value="activity">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBagIcon className="h-5 w-5" />
                  Shopping Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Items in Cart</span>
                  <span className="font-semibold">{cartItems.length}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Wishlist Items</span>
                  <span className="font-semibold">{wishlistItems.length}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Total Orders</span>
                  <span className="font-semibold">{orders.length}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HeartIcon className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/cart">
                    <ShoppingBagIcon className="h-4 w-4 mr-2" />
                    View Cart ({cartItems.length})
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/wishlist">
                    <HeartIcon className="h-4 w-4 mr-2" />
                    View Wishlist ({wishlistItems.length})
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/products">Continue Shopping</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
