const { Recipe } = require("../../models/");

const getRecipesByName = async(req, res) => {
const {keyWord} = req.params;
console.log(keyWord);
let result = await Recipe.find({title: new RegExp(keyWord, 'i')}).exec();

res.json(result)
};

module.exports = getRecipesByName;
//шукає тільки по title 