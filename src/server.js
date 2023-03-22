import express from "express";
const PORT = 4000;
const app = express();

// 어플리케이션 설정

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if (url === "/protected") {
    console.log("not allowed");
    return res.send("<h1>not allowed</h1>");
  }
  console.log("allowed continue");
  next();
};

const handleHome = (req, res) => {
  return res.send("hello world");
};

const handleProtected = (req, res) => {
  return res.send("welcome to the private lounge");
};

app.use(logger);
app.use(privateMiddleware);

app.get("/", handleHome);
app.get("/protected", handleProtected);

const handleLogin = (req, res) => {
  return res.send({ message: "loging here" });
};

app.get("/login", handleLogin);
//

const handleListening = () =>
  console.log(`server listening on port http://localhost: ${PORT}`);

app.listen(PORT, handleListening);
