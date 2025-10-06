import { Restaurant } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Star, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-[var(--shadow-hover)] hover:-translate-y-1 cursor-pointer">
        <div className="relative h-48 overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="h-full w-full object-cover transition-transform hover:scale-110"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Badge className="bg-card/90 backdrop-blur">
              <Star className="h-3 w-3 mr-1 fill-accent text-accent" />
              {restaurant.rating}
            </Badge>
          </div>
        </div>
        
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold">{restaurant.name}</h3>
          <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {restaurant.deliveryTime}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              {restaurant.deliveryFee.toFixed(2)} delivery
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
