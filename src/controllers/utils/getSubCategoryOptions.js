import categoriesAndSubcategories from "../../data/categoriesAndSubcategories";

export default function getSubCategoryOptions(category) {
  let categories = categoriesAndSubcategories[category];

  if (!categories) return [];

  let subCats = categories.subCategories;

  let options = [];
  for (let key in subCats) {
    options.push({
      value: key,
      label: subCats[key],
    });
  }

  return options;
}
