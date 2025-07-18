import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowPathIcon, ShieldCheckIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export const Returns = () => {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Returns & Refunds</h1>
        <p className="text-muted-foreground">
          Our hassle-free return policy ensures your satisfaction with every purchase
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Return Policy */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ArrowPathIcon className="h-5 w-5" />
                <span>Return Policy Overview</span>
              </CardTitle>
              <CardDescription>
                What you need to know about returning items
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">30-Day Return Window</h4>
                <p className="text-sm text-green-700">
                  You have 30 days from the delivery date to return most items for a full refund.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">What Can Be Returned?</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Items in original condition with tags</li>
                  <li>• Unopened electronics in original packaging</li>
                  <li>• Clothing and accessories (unworn, with tags)</li>
                  <li>• Books and media (if unopened/unused)</li>
                  <li>• Home goods (unused condition)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Return Conditions</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Items must be in original packaging</li>
                  <li>• All accessories and manuals included</li>
                  <li>• No signs of wear or damage</li>
                  <li>• Original receipt or order confirmation</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ExclamationTriangleIcon className="h-5 w-5" />
                <span>Non-Returnable Items</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-red-700 font-medium mb-2">
                  The following items cannot be returned for hygiene and safety reasons:
                </p>
                <ul className="text-sm text-red-600 space-y-1">
                  <li>• Personal care items (opened)</li>
                  <li>• Undergarments and swimwear</li>
                  <li>• Food and supplements</li>
                  <li>• Custom or personalized items</li>
                  <li>• Software and digital downloads</li>
                  <li>• Items damaged by misuse</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Special Cases</h4>
                <p className="text-sm text-muted-foreground">
                  Some electronics and appliances may have different return periods. 
                  Check the product page or contact customer service for specific items.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Return Process */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How to Return an Item</CardTitle>
              <CardDescription>
                Simple steps to return your purchase
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Initiate Return</h4>
                    <p className="text-sm text-muted-foreground">
                      Go to "Order History" in your account and select "Return Item" for the product you want to return.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Print Return Label</h4>
                    <p className="text-sm text-muted-foreground">
                      Download and print the prepaid return label we'll email to you.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Package Item</h4>
                    <p className="text-sm text-muted-foreground">
                      Pack the item securely in original packaging with all accessories and attach the return label.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold">Ship Package</h4>
                    <p className="text-sm text-muted-foreground">
                      Drop off at any courier pickup point or schedule a pickup from your location.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <Button className="w-full">
                  Start Return Process
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ClockIcon className="h-5 w-5" />
                <span>Refund Timeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Processing Time</h4>
                  <Badge variant="secondary">2-3 Days</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Once we receive your return, we'll inspect the item and process your refund.
                </p>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Refund Method</h4>
                  <Badge variant="outline">Original Payment</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Refunds are issued to your original payment method (credit card, bank account, etc.).
                </p>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Bank Processing</h4>
                  <Badge variant="secondary">3-7 Days</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your bank or payment provider may take additional time to process the refund.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShieldCheckIcon className="h-5 w-5" />
                <span>Return Shipping</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold text-green-600">Free Return Shipping</h4>
                <p className="text-sm text-muted-foreground">
                  We cover return shipping costs for defective items, wrong items sent, or our errors.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-orange-600">Customer Pays Shipping</h4>
                <p className="text-sm text-muted-foreground">
                  For returns due to change of mind or sizing issues, customers cover return shipping costs.
                </p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-700">
                  <strong>Pro Tip:</strong> Consider exchanging for a different size or color to avoid return shipping fees!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Need Help with Returns?</CardTitle>
          <CardDescription>
            Our customer service team is here to assist you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Email Support</h4>
              <p className="text-sm text-muted-foreground">returns@Hinggi.id.com</p>
              <p className="text-xs text-muted-foreground">Response within 24 hours</p>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold mb-2">Phone Support</h4>
              <p className="text-sm text-muted-foreground">+62 21 1234 5678</p>
              <p className="text-xs text-muted-foreground">Mon-Fri, 9AM-6PM</p>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold mb-2">Live Chat</h4>
              <p className="text-sm text-muted-foreground">Available on website</p>
              <p className="text-xs text-muted-foreground">Mon-Fri, 9AM-6PM</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};