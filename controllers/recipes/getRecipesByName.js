const { default: mongoose } = require("mongoose");
const { Recipe } = require("../../models/");
const { Ingredient } = require("../../models/recipes");

const getRecipesByName = async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const type = req.query.searchType;
  const { keyWord } = req.params;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  console.log(keyWord, page, limit);

  try {
    let recepiesCount;
    let recepies;
    if (type === 'title') {
        // by name


        recepies = await Recipe.find({ title: new RegExp(keyWord, "i") })
        .skip(startIndex)
        .limit(endIndex);
        recepiesCount = await Recipe.find({ title: new RegExp(keyWord, "i") }).count();
    } else {
         // by ingridients

        let ingredient = await Ingredient.findOne({ ttl: new RegExp(keyWord, "i") });
        let id = JSON.parse(JSON.stringify(ingredient))?._id;
        let objectId = new mongoose.Types.ObjectId(id);
        recepies = await Recipe.find({ "ingredients.id": objectId }).skip(startIndex).limit(endIndex);
        recepiesCount = await Recipe.find({ "ingredients.id": objectId }).count();
    }

    res.json({
      prevPage: page === "1" ? false : true,
      nextPage: recepiesCount > page * limit ? true : false,
      recepies: recepies.slice(0, limit),
    });
  } catch (e) {
    console.log(e);
    res.json({
      prevPage: false,
      nextPage: false,
      recepies: [],
      data: {
        message: "Error occured. No results found",
      },
    });
  }
};

module.exports = getRecipesByName;
