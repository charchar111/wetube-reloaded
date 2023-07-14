import "dotenv/config";
// import * as dotenv from "dotenv";
// dotenv.config();
//위 방식은 안됨
import "./db";
//몽구스, 몽고 연결/

import "./models/Video";
import "./models/User";
import "./models/comment";
import app from "./server";

console.log("init");
const PORT = 3000;
const handleListening = () =>
  console.log(`server listening on port http://localhost: ${PORT}`);

app.listen(PORT, handleListening);
