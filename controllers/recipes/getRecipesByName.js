const { default: mongoose } = require("mongoose");
const { Recipe } = require("../../models/");
const {Ingredient}= require("../../models/recipes")

const getRecipesByName = async(req, res) => {
    try {
        // by name 
        const {keyWord} = req.params;
        console.log(keyWord);
        let recepies = await Recipe.find({title: new RegExp(keyWord, 'i')}).exec();

    // by ingridients 

    let ingredient = await Ingredient.findOne({ttl: new RegExp(keyWord, 'i')}).exec();
let id = JSON.parse(JSON.stringify(ingredient))._id;
let objectId =  new mongoose.Types.ObjectId(id);
let recepies2 = await Recipe.find( { "ingredients.id": objectId });

res.json(recepies2.concat(recepies));
    }catch (e) {
        console.log(e);
    };


};


module.exports = getRecipesByName;




