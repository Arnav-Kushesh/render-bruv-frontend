import categoriesAndSubcategories from "../../data/categoriesAndSubcategories";
import capitalizeFirstLetter from "../capitalizeFirstLetter";

export default function getCategoryString(category) {
  let theCat = categoriesAndSubcategories[category];

  if (!theCat) return "Un-categorized";
  return capitalizeFirstLetter(theCat.name);
}
