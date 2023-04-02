const router = require("express").Router();
const { ownRecipes } = require("../../controllers/index");
const { authenticate, isValidId } = require("../../middlewares/index");

// ============================================================================ //

router.post("/add", authenticate, ownRecipes.addRecipe);

// ============================================================================ //

router.delete("/remove/:recipeId", authenticate, isValidId, ownRecipes.removeRecipe);

// ============================================================================ //

router.get("/:userId", authenticate, ownRecipes.getUserRecipes);

// ============================================================================ //
module.exports = router;

// {
//       title: "Boilt a la Portuguese",
//       category: "Pork",
//       area: "Portugal",
//       instructions:
//         "Put the 3 bouillons, salt, cloves, and the chouriço on a big pot with water and let them boil. Clean the meats (beef, pork chops, pigs foot, pig’s ear, and meat “chouriço”) and add them to the pot to boil. Once all the meats are cooked, remove them from the pot and plate them. Wash the vegetables and add them to the water that was used to cook the meat. Let them boil for 5 minutes.Add the rice pudding, the turnips, and the carrots after cutting them into quarters. Let them boil for 5 minutes.In the meanwhile add the rice and some of the stock from the meats into another pot. Cook the rice as you normally would.Add the potatoes cut in half to the pot with the vegetables.Pierce the puddings and the “chouriço” with a toothpick and add them to the pot.After 4 minutes remove the blood sausage.Remove some of the stock to another pot and add the beans, letting them cook for 2 minutes.When everything is cooked, cut the meats and plate everything.",
//       description:
//         "Do not be fooled by its simple name though, this is considered by many portugueses to be the national dish",
//       time: "120 min",
//       thumb: "",
//       preview: "",
//       owner: req.user._id,
// }
