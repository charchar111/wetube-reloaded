import "./db";
//몽구스, 몽고 연결/

import "./models/Video";
import "./models/User";
import app from "./server";

console.log("init");
const PORT = 4000;
const handleListening = () =>
  console.log(`server listening on port http://localhost: ${PORT}`);

app.listen(PORT, handleListening);
