import capitalizeFirstLetter from "./capitalizeFirstLetter";

export default function getCategoryName({ categoryID, adminSettings }) {
  if (!categoryID) return "Un-categorized";
  if (!adminSettings) return null;
  if (!adminSettings.data) return null;
  if (!adminSettings.data.categories) return null;

  for (let item of adminSettings.data.categories) {
    if (item._id == categoryID)
      return capitalizeFirstLetter(item.name.toLowerCase());
  }

  return "Category Deleted";
}
