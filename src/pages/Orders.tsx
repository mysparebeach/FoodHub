import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Order } from '@/types';
import { Package, Truck, CheckCircle, ShoppingBag } from 'lucide-react';

const Orders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const allOrders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
  const userOrders = allOrders.filter((order) => order.userId === user?.id);

  const statusConfig = {
    preparing: { icon: Package, label: 'Preparing', color: 'text-accent' },
    'out-for-delivery': { icon: Truck, label: 'Out for Delivery', color: 'text-primary' },
    delivered: { icon: CheckCircle, label: 'Delivered', color: 'text-secondary' },
  };

  if (userOrders.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-6">
            Start ordering delicious food now!
          </p>
          <Button onClick={() => navigate('/')}>Browse Restaurants</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">Track and manage your orders</p>
        </div>

        <div className="space-y-4">
          {userOrders.map((order) => {
            const StatusIcon = statusConfig[order.status].icon;
            
            return (
              <Card key={order.id} className="p-6 hover:shadow-[var(--shadow-card)] transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="font-mono font-semibold">#{order.id}</p>
                  </div>
                  
                  <Badge variant="secondary" className="gap-2 w-fit">
                    <StatusIcon className={`h-4 w-4 ${statusConfig[order.status].color}`} />
                    {statusConfig[order.status].label}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center border-t pt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="font-bold text-lg">${order.totalAmount.toFixed(2)}</p>
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/order-confirmation/${order.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Orders;
