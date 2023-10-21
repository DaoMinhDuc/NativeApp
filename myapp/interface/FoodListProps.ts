// FoodListProps.ts
import { Food } from '../interface/Food';

export interface FoodListProps {
  category: string;
  onFoodDataLoaded: (data: Food[]) => void;
}
