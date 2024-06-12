export class AppData {
  constructor() {
    this.food = [];
  }

  addFood(carbs, protein, fat) {
    this.food.push({
      carbs: Number.parseInt(carbs, 10),
      protein: Number.parseInt(protein, 10),
      fat: Number.parseInt(fat, 10),
    });
  }

  get totalCarbs() {
    return this.food.reduce((total, current) => total + current.carbs, 0);
  }

  get totalProtein() {
    return this.food.reduce((total, current) => total + current.protein, 0);
  }

  get totalFat() {
    return this.food.reduce((total, current) => total + current.fat, 0);
  }

  get totalCalories() {
    return this.totalCarbs * 4 + this.totalProtein * 4 + this.totalFat * 9;
  }
}
