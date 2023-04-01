const { Schema, model } = require("mongoose");

const ingredientSchema = Schema({
  ttl: {
    type: String,
    default: "",
    required: true,
  },
  desc: {
    type: String,
    default: "",
    required: true,
  },
  t: {
    type: String,
    default: "",
  },
  thb: {
    type: String,
    required: true,
  },
});

const Ingredient = model("Ingradient", ingredientSchema);

const recipeSchema = Schema(
  {
    imgURL: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    cookingTime: {
      type: String,
      required: true,
    },
    ingredients: [ingredientSchema],
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const Recipe = model("Recipe", recipeSchema);

module.exports = {
  Recipe,
  Ingredient,
};
