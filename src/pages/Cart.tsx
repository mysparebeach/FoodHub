import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, totalAmount, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please login to place an order');
      navigate('/auth');
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Add some delicious items to get started
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
          <h1 className="text-4xl font-bold mb-2">Your Cart</h1>
          <p className="text-muted-foreground">Review your items before checkout</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      ${item.price.toFixed(2)}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value) || 0)
                        }
                        className="h-8 w-16 text-center"
                      />
                      
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <p className="font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>$2.99</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${(totalAmount * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${(totalAmount + 2.99 + totalAmount * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full mb-2" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
