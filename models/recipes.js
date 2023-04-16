const { Schema, model } = require("mongoose");

const ingredientSchema = Schema({
  ttl: { type: String, require: true, default: "" },
  desc: { type: String, require: true, default: "" },
  t: { type: String, require: true, default: "" },
  thb: { type: String, require: true, default: "" },
});

const Ingredient = model("Ingredient", ingredientSchema);

const recipeSchema = Schema(
  {
    imgURL: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      required: true,
      default: "",
    },
    category: {
      type: String,
      required: true,
      default: "",
    },
    area: {
      type: String,
      required: true,
      default: "",
    },
    instructions: {
      type: String,
      required: true,
      default: "",
    },
    description: {
      type: String,
      required: true,
      default: "",
    },
    thumb: {
      type: String,
      required: true,
      default: "",
    },
    preview: {
      type: String,
      required: true,
      default: "",
    },
    time: {
      type: String,
      required: true,
      default: "",
    },
    popularity: {
      type: Number,
      default: "",
    },
    favorites: {
      type: Array,
      default: [],
    },
    likes: {
      type: Array,
      default: [],
    },
    youtube: {
      type: String,
      default: "",
    },
    tags: {
      type: Array,
      default: [],
    },

    ingredients: {
      type: Array,
      required: true,
      default: [],
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
