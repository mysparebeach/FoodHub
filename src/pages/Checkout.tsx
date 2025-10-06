import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Order } from '@/types';
import { toast } from 'sonner';

const Checkout = () => {
  const { cart, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const order: Order = {
      id: Date.now().toString(),
      userId: user!.id,
      restaurantId: cart[0].restaurantId,
      restaurantName: 'Restaurant Name', // In real app, fetch from restaurant data
      items: cart,
      totalAmount: totalAmount + 2.99 + totalAmount * 0.1,
      status: 'preparing',
      estimatedDelivery: new Date(Date.now() + 30 * 60000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      createdAt: new Date(),
    };

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    clearCart();
    toast.success('Order placed successfully!');
    navigate(`/order-confirmation/${order.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>

          <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Order Items</h2>
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
            <p className="text-muted-foreground">123 Main Street, Apt 4B</p>
            <p className="text-muted-foreground">New York, NY 10001</p>
          </Card>

          <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Payment Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>$2.99</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>${(totalAmount * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${(totalAmount + 2.99 + totalAmount * 0.1).toFixed(2)}</span>
              </div>
            </div>
          </Card>

          <Button
            className="w-full"
            size="lg"
            onClick={handlePlaceOrder}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Place Order'}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
