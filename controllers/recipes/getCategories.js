const {Recipe}=require('../../models/recipes');

const getCategories = async(req, res) => {
    let result = await Recipe.find({}, {category : 1, _id: 0});
    let uniqueCategories = [];
    result.forEach(r => {
       if (!uniqueCategories.includes(r.category)) 
        uniqueCategories.push(r.category);
    });
    res.json(uniqueCategories.sort())
}

module.exports = getCategories;


// const getCategories = async(res) => {
//     res.json(await Recipe.distinct('category'));
// };