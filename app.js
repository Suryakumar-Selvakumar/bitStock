// libs
const express = require("express");
const path = require("node:path");
const asyncHandler = require("express-async-handler");
const session = require("express-session");
require("dotenv").config();

// app config
const app = express();
const assetsPath = path.join(__dirname, "public");
app.use("/static", express.static(assetsPath)); // setup path for static files
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(
  session({
    secret: process.env.ADMIN_PASSWORD,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 12,
    },
  })
);

// env
const port = process.env.PORT || 3000;

// Setup middleware to use form data
app.use(express.urlencoded({ extended: true }));

// Routers
const productsRouter = require("./routes/productsRouter");
const buildsRouter = require("./routes/buildsRouter");

//Routes
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/products", productsRouter);
app.use("/builds", buildsRouter);

// Server
app.listen(port, () => console.log(`Server listening on port ${port}`));
