import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Truck, Package } from 'lucide-react';
import { Order } from '@/types';

const OrderConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <p>Order not found</p>
        </div>
      </div>
    );
  }

  const statusConfig = {
    preparing: { icon: Package, label: 'Preparing', color: 'text-accent' },
    'out-for-delivery': { icon: Truck, label: 'Out for Delivery', color: 'text-primary' },
    delivered: { icon: CheckCircle, label: 'Delivered', color: 'text-secondary' },
  };

  const StatusIcon = statusConfig[order.status].icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-secondary/20 mb-4">
            <CheckCircle className="h-12 w-12 text-secondary" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Your order has been placed successfully
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Order ID</p>
                <p className="font-mono font-semibold">#{order.id}</p>
              </div>
              <Badge variant="secondary" className="gap-2">
                <StatusIcon className={`h-4 w-4 ${statusConfig[order.status].color}`} />
                {statusConfig[order.status].label}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Estimated delivery: {order.estimatedDelivery}</span>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Order Items</h2>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button className="flex-1" onClick={() => navigate('/orders')}>
              View All Orders
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderConfirmation;
