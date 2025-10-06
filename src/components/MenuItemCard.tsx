import { MenuItem } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface MenuItemCardProps {
  item: MenuItem;
}

export const MenuItemCard = ({ item }: MenuItemCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-[var(--shadow-card)] transition-shadow">
      <div className="flex gap-4 p-4">
        <div className="flex-1 space-y-2">
          <h4 className="font-semibold">{item.name}</h4>
          <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
          <p className="text-lg font-bold text-primary">${item.price.toFixed(2)}</p>
        </div>
        
        <div className="relative w-24 h-24 flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover rounded-lg"
          />
          <Button
            size="icon"
            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full shadow-lg"
            onClick={handleAddToCart}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
