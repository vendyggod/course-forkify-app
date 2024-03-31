export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    // Changing to camelCase format and write to state obj
    state.recipe = Object.keys(data.data.recipe).reduce((acc, key) => {
      const formattedKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );
      acc[formattedKey] = data.data.recipe[key];
      return acc;
    }, {});

    console.log(state.recipe);
  } catch {
    console.error('Cannot get the recipe data.');
  }
};
