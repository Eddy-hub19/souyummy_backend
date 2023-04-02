const { Schema, model } = require("mongoose");

const ingredientSchema = Schema({
  ttl: { type: String, require: true, default: "" },
  desc: { type: String, require: true, default: "" },
  t: { type: String, require: true, default: "" },
  thb: { type: String, require: true, default: "" },
  // ingredient: {
  //   type: String,
  //   require: true,
  // },
  // qty: {
  //   type: String,
  //   require: true,
  // },
  // imgURL: {
  //   type: String,
  //   default: "",
  // },
  // description: {
  //   type: String,
  //   default: "",
  // },
  // id: {
  //   type: String,
  // },
  _id: false,
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
      required: true,
      default: "",
    },
    favorites: {
      type: Array,
      required: true,
      default: [],
    },
    likes: {
      type: Array,
      required: true,
      default: [],
    },
    youtube: {
      type: String,
      required: true,
      default: "",
    },
    tags: {
      type: Array,
      required: true,
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
