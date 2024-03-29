import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import { localMiddleware } from "./middlewares";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import apiRouter from "./routers/apiRouter";

const app = express();
const logger = morgan("dev");
app.use(logger);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(express.urlencoded({ extended: true }));
// app.use(express.text());
app.use(express.json());
app.use(
  session({
    secret: process.env.COKKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    cookie: { maxAge: 86400000 },
    // 하루 24시간 유지
  })
);
// app.use((req, res, next) => {
//   // console.log(req.headers);
//   // console.log("-------------------------------------------");
//   req.sessionStore.all((error, sessions) => {
//     console.log(sessions);
//     next();
//   });
// });
app.use(flash());
app.use(localMiddleware);
// app.get("/add-one", (req, res, next) => {
//   console.log("add-one");
//   req.session.potato += 1;
//   console.log(req.session);
//   return res.send(`${req.session.id} \n ${req.session.potato}`);
// });
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);

console.log("server");
export default app;
