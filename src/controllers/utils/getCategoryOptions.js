import categoriesAndSubcategories from "../../data/categoriesAndSubcategories";

export default function getCategoryOptions() {
  let categories = [];

  for (let key in categoriesAndSubcategories) {
    categories.push({
      value: key,
      label: categoriesAndSubcategories[key].name,
    });
  }

  return categories;
}
