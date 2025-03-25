// libs
const express = require("express");
const path = require("node:path");
const asyncHandler = require("express-async-handler");

// app config
const app = express();
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath)); // setup path for static files
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// env
const port = process.env.PORT || 3000;

// Setup middleware to use form data
app.use(express.urlencoded({ extended: true }));

// Routers
const productsRouter = require("./routes/productsRouter");

//Routes
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/products", productsRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));
