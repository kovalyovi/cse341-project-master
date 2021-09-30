// Our initial setup (package requires, port number setup)
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3000;

const app = express();

// Route setup. You can implement more in the future!
const ta01Routes = require("./routes/ta01");
const ta02Routes = require("./routes/ta02");
const ta03Routes = require("./routes/ta03");
const ta04Routes = require("./routes/ta04");
const ta05Routes = require("./routes/ta05");

const prove02Routes = require("./routes/prove/prove02");
const prove03Routes = require("./routes/prove/prove03");
const prove04Routes = require("./routes/prove/prove04");

// CORS setup
const corsOptions = {
  origin: "https://cse-361-kovalyovi.herokuapp.com/",
  optionsSuccessStatus: 200,
};

app
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .use(cors(corsOptions))
  // For view engine as Pug
  //.set('view engine', 'pug') // For view engine as PUG.
  // For view engine as hbs (Handlebars)
  //.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'})) // For handlebars
  //.set('view engine', 'hbs')
  .use(express.urlencoded({ extended: true })) // For parsing the body of a POST
  .use(express.json())
  .use("/ta01", ta01Routes)
  .use("/ta02", ta02Routes)
  .use("/ta03", ta03Routes)
  .use("/ta04", ta04Routes)
  .use("/ta05", ta05Routes)
  .use("/prove02/", prove02Routes)
  .use("/prove03/", prove03Routes)
  .use("/prove04/", prove04Routes)
  .get("/", (req, res, next) => {
    // This is the primary index, always handled last.
    res.render("pages/index", {
      title: "Welcome to ILYA Kovalyov repo",
      path: "/",
    });
  })
  .use((req, res, next) => {
    // 404 page
    res.render("pages/404", { title: "404 - Page Not Found", path: req.url });
  });
// .listen(PORT, () => console.log(`Listening on ${PORT}`));

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  family: 4,
};

const MONGODB_URL =
  process.env.MONGODB_URL ||
  "mongodb+srv://ilya:BkmzRjdfktd301194@cluster0.lyjub.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URL, options)
  .then((result) => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.log("MONGOOSE ERROR");
    console.log(err);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
