import { API_URL } from './config';
import { getJSON, timeout } from './helpers';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    // Fetching recipe from API
    const data = await getJSON(`${API_URL}/${id}`);

    // Changing to camelCase format and write to state obj
    state.recipe = Object.keys(data.data.recipe).reduce((acc, key) => {
      const formattedKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );
      acc[formattedKey] = data.data.recipe[key];
      return acc;
    }, {});

    console.log(state.recipe);
  } catch (err) {
    console.error(err);
  }
};
