"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _expressFlash = _interopRequireDefault(require("express-flash"));
var _connectMongo = _interopRequireDefault(require("connect-mongo"));
var _middlewares = require("./middlewares");
var _rootRouter = _interopRequireDefault(require("./routers/rootRouter"));
var _videoRouter = _interopRequireDefault(require("./routers/videoRouter"));
var _userRouter = _interopRequireDefault(require("./routers/userRouter"));
var _apiRouter = _interopRequireDefault(require("./routers/apiRouter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
var logger = (0, _morgan["default"])("dev");
app.use(logger);
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(_express["default"].urlencoded({
  extended: true
}));
// app.use(express.text());
app.use(_express["default"].json());
app.use((0, _expressSession["default"])({
  secret: process.env.COKKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: _connectMongo["default"].create({
    mongoUrl: process.env.DB_URL
  }),
  cookie: {
    maxAge: 86400000
  }
  // 하루 24시간 유지
}));
// app.use((req, res, next) => {
//   // console.log(req.headers);
//   // console.log("-------------------------------------------");
//   req.sessionStore.all((error, sessions) => {
//     console.log(sessions);
//     next();
//   });
// });
app.use((0, _expressFlash["default"])());
app.use(_middlewares.localMiddleware);
// app.get("/add-one", (req, res, next) => {
//   console.log("add-one");
//   req.session.potato += 1;
//   console.log(req.session);
//   return res.send(`${req.session.id} \n ${req.session.potato}`);
// });
app.use(function (req, res, next) {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});
app.use("/uploads", _express["default"]["static"]("uploads"));
app.use("/static", _express["default"]["static"]("assets"));
app.use("/", _rootRouter["default"]);
app.use("/videos", _videoRouter["default"]);
app.use("/users", _userRouter["default"]);
app.use("/api", _apiRouter["default"]);
console.log("server");
var _default = app;
exports["default"] = _default;