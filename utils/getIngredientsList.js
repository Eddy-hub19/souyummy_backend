const { BASE_URL } = process.env;
const fetch = require("node-fetch");
const HttpError = require("../routes/errors/HttpErrors");

const getIngredientsList = async (token) => {
  const res = await fetch(`${BASE_URL}/ingredients/list`, {
    headers: {
      Authorization: `${token}`,
    },
  });
  const data = await res.json();
  if (!data) {
    throw HttpError(500, "Ingredients not found");
  }

  return data.ingredients;
};

module.exports = getIngredientsList;
