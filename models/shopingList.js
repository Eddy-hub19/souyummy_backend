const { Schema, model } = require("mongoose");
const Joi = require("joi");

const mongooseErrorHandler = require("../helpers/handleMongooseError");

const shoppingListSchema = Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    nameIngredient: {
      type: String,
      require: true,
    },
    weight: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    recipeId: {
      type: String,
      require: true,
    },
  },
  { versionKey: false }
);

shoppingListSchema.post("save", mongooseErrorHandler);

const addToShoppingListSchema = Joi.object({
  nameIngredient: Joi.string().required(),
  weight: Joi.string().required(),
  image: Joi.string().required(),
  recipeId: Joi.string().required(),
});

const ShoppingList = model("shoppinglist", shoppingListSchema);

module.exports = { ShoppingList, addToShoppingListSchema };
