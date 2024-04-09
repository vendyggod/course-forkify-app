import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

export const loadRecipe = async function (id) {
  try {
    // Fetching recipe from API
    const data = await getJSON(`${API_URL}${id}`);

    // Changing to camelCase format and write to state obj
    state.recipe = Object.keys(data.data.recipe).reduce((acc, key) => {
      const formattedKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );
      acc[formattedKey] = data.data.recipe[key];
      return acc;
    }, {});
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);

    data.data.recipes.forEach(el => {
      // Formatting object keys from "test_test" to "testTest"
      const formattedObj = Object.keys(el).reduce((acc, key) => {
        const formattedKey = key.replace(/_([a-z])/g, (_, letter) =>
          letter.toUpperCase()
        );
        acc[formattedKey] = el[key];
        return acc;
      }, {});

      // Adding formatted objects to global state object
      state.search.results.push(formattedObj);
    });
  } catch (err) {
    throw err;
  }
};
