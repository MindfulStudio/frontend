export const transformCustoms = (customs) => {
  let transformed = {};
  customs.forEach((obj, index) => {
    let { isActive, isDefault, name, family, category } = obj;
    let group = family || category;
    let id = index + (family ? 400 : 800); // id >400 for emotions, >800 for tags
    // If custom is active, push into the according array of its group:
    if (isActive) {
      if (!transformed[group]) {
        transformed[group] = [];
      }
      let item = { id, name, isDefault, isActive };
      if (family) item.family = family;
      if (category) item.category = category;
      transformed[group].push(item);
    }
  });
  return transformed;
};
