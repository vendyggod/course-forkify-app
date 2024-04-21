import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
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

    // Reset current page whenever NEW search is made
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};
