const express = require("express");
const logger = require("morgan");
// const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
require("dotenv").config();

// const corsOptions = {
//   origin: ["http://localhost:3000"],
//   optionsSuccessStatus: 200,
//   allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Headers"],
// };

// const mainRouter = require("./routes/api/main");
const usersRouter = require("./routes/api/auth");
const ingredientsRouter = require("./routes/api/ingredients");
const recipesRouter = require("./routes/api/recipes");
const favoriteRouter = require("./routes/api/favorite");
const ownRecipesRouter = require("./routes/api/ownRecipes");
const shoppingListRouter = require("./routes/api/shoppingList");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
// app.use(cors());
app.use(express.json());
// app.use(cors(corsOptions));
// app.use("/", mainRouter);
app.use("/auth", usersRouter);
app.use("/recipes", recipesRouter);
app.use("/ingredients", ingredientsRouter);
app.use("/own-recipes", ownRecipesRouter);
app.use("/shopping-list", shoppingListRouter);
app.use("/favorite", favoriteRouter);
app.use("/shopping-list", shoppingListRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
