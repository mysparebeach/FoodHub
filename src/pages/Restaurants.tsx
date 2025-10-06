import { useState } from 'react';
import { RestaurantCard } from '@/components/RestaurantCard';
import { SearchFilter } from '@/components/SearchFilter';
import { restaurants } from '@/data/mockData';
import { Header } from '@/components/Header';

const Restaurants = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);

  const handleCuisineToggle = (cuisine: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCuisine =
      selectedCuisines.length === 0 || selectedCuisines.includes(restaurant.cuisine);
    
    const matchesRating = restaurant.rating >= minRating;

    return matchesSearch && matchesCuisine && matchesRating;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Discover Restaurants
          </h1>
          <p className="text-muted-foreground">
            Order food from the best restaurants in your area
          </p>
        </div>

        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCuisines={selectedCuisines}
          onCuisineToggle={handleCuisineToggle}
          minRating={minRating}
          onRatingChange={setMinRating}
        />

        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No restaurants found matching your criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Restaurants;
