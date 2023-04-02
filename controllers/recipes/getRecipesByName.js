const { default: mongoose } = require("mongoose");
const { Recipe } = require("../../models/");
const {Ingredient}= require("../../models/recipes")

const getRecipesByName = async(req, res) => {
            const page = req.query.page;
            const limit = req.query.limit;
    try {
        // by name 
            const {keyWord} = req.params;
            const startIndex = (page-1) * limit;
            const endIndex = page * limit;
            console.log(keyWord, page, limit);
            
        let recepies = await Recipe.find({title: new RegExp(keyWord, 'i')}).skip(startIndex).limit(endIndex);
        const recepiesCount = await Recipe.find( {title: new RegExp(keyWord, 'i')}).count();

    // by ingridients 

    let ingredient = await Ingredient.findOne({ttl: new RegExp(keyWord, 'i')});
    let id = JSON.parse(JSON.stringify(ingredient))?._id;
    let objectId =  new mongoose.Types.ObjectId(id);
    let recepies2 = await Recipe.find( { "ingredients.id": objectId }).skip(startIndex).limit(endIndex);
    const recepies2Count = await Recipe.find( { "ingredients.id": objectId }).count();

    res.json({
        prevPage: page === "1" ? false : true,
        nextPage: (recepiesCount + recepies2Count) > page * limit ? true : false,
        recepies: recepies2.concat(recepies).slice(0, limit)
    }
        );
    
    }catch (e) {
        console.log(e);
        res.json({
            prevPage: false,
            nextPage: false,
            recepies: [],
            data:{
                message: "Error occured. No results found"
            }
        });
    };
};


module.exports = getRecipesByName;




