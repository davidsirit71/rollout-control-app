require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
//const flash = require("connect-flash");

const cors = require("cors");
const passport = require("passport"); // not sure

const { DBURL } = process.env;
mongoose.Promise = Promise; // ???

mongoose
  .connect(
    DBURL,
    { useNewUrlParser: true }
  )
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
let whitelist = [
  'http://localhost:3000'
];
let corsOptions = {
  origin: function(origin, callback){
      let originIsWhitelisted = whitelist.indexOf(origin) !== -1;
      callback(null, originIsWhitelisted);
  },
  credentials: true
};
app.use(cors(corsOptions));

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

app.use(session({
  secret: 'angular auth passport secret shh',
  resave: true,
  saveUninitialized: true,
  cookie:{
    httpOnly: true,
    maxAge: 2419200000
  },
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));
require('./passport')(app);


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));


// hbs.registerHelper("ifUndefined", (value, options) => {
//   if (arguments.length < 2)
//     throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
//   if (typeof value !== undefined) {
//     return options.inverse(this);
//   } else {
//     return options.fn(this);
//   }
// });

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

// Enable authentication using session + passport
// app.use(
//   session({
//     secret: "irongenerator",
//     resave: true,
//     saveUninitialized: true,
//     store: new MongoStore({ mongooseConnection: mongoose.connection })
//   })
// );
// app.use(flash());
// require("./passport")(app);

const index = require("./routes/index");
app.use("/", index);
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);
//const genericCrud = require('./routes/genericCRUD');
//app.use('/api/user', genericCrud(require('./models/User')));
//app.use('/api/project', genericCrud(require('./models/Project')));
//app.use('/api/outsourcing', genericCrud(require('./models/Outsourcing')));
//app.use('/api/sitelocation', genericCrud(require('./models/SiteLocation')));

module.exports = app;
