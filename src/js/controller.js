const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const getRecipe = async function () {
  try {
    // Fetching data from recipes API
    const res = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    // Changing to camelCase format
    const recipe = Object.keys(data.data.recipe).reduce((acc, key) => {
      const formattedKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );
      acc[formattedKey] = data.data.recipe[key];
      return acc;
    }, {});

    console.log(recipe);
  } catch (err) {
    console.error(err);
  }
};

getRecipe();
