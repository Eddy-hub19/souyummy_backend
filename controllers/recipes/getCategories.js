const {Recipe}=require('../../models/recipes');

const getCategories = async(req, res) => {
    let result = await Recipe.find();
    result = result.map(r => r.category);
    let uniqueCategories = [];
    result.forEach(r => {
       if (!uniqueCategories.includes(r)) 
        uniqueCategories.push(r);
    });

    res.json(uniqueCategories.sort())
};

module.exports = getCategories;

