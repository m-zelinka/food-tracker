export function capitalize(word) {
  return word[0].toUpperCase() + word.substring(1).toLowerCase();
}

export function calculateCalories(carbs, protein, fat) {
  return carbs * 4 + protein * 4 + fat * 9;
}
