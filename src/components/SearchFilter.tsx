import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCuisines: string[];
  onCuisineToggle: (cuisine: string) => void;
  minRating: number;
  onRatingChange: (rating: number) => void;
}

const cuisineTypes = ['American', 'Japanese', 'Italian', 'Mexican', 'Healthy', 'Indian'];

export const SearchFilter = ({
  searchQuery,
  onSearchChange,
  selectedCuisines,
  onCuisineToggle,
  minRating,
  onRatingChange,
}: SearchFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search restaurants or cuisines..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Cuisine Type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {cuisineTypes.map((cuisine) => (
            <DropdownMenuCheckboxItem
              key={cuisine}
              checked={selectedCuisines.includes(cuisine)}
              onCheckedChange={() => onCuisineToggle(cuisine)}
            >
              {cuisine}
            </DropdownMenuCheckboxItem>
          ))}
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Minimum Rating</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {[4.0, 4.5, 4.7].map((rating) => (
            <DropdownMenuCheckboxItem
              key={rating}
              checked={minRating === rating}
              onCheckedChange={() => onRatingChange(rating === minRating ? 0 : rating)}
            >
              {rating}+ Stars
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
