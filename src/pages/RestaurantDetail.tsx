import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { MenuItemCard } from '@/components/MenuItemCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { restaurants, menuItems } from '@/data/mockData';
import { Star, Clock, DollarSign, ArrowLeft } from 'lucide-react';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const restaurant = restaurants.find((r) => r.id === id);
  const menu = menuItems.filter((item) => item.restaurantId === id);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">
          <p>Restaurant not found</p>
        </div>
      </div>
    );
  }

  const categories = [...new Set(menu.map((item) => item.category))];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 container pb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="mb-4 bg-card/80 backdrop-blur"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
            <div className="flex flex-wrap gap-3 items-center">
              <Badge variant="secondary" className="gap-1">
                <Star className="h-3 w-3 fill-accent text-accent" />
                {restaurant.rating}
              </Badge>
              <span className="text-muted-foreground">{restaurant.cuisine}</span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                {restaurant.deliveryTime}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                {restaurant.deliveryFee.toFixed(2)} delivery
              </span>
            </div>
          </div>
        </div>

        <div className="container py-8">
          {categories.map((category) => (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{category}</h2>
              <div className="grid gap-4">
                {menu
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default RestaurantDetail;
