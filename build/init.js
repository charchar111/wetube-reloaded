"use strict";

require("dotenv/config");
require("./db");
require("./models/Video");
require("./models/User");
require("./models/comment");
var _server = _interopRequireDefault(require("./server"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import * as dotenv from "dotenv";
// dotenv.config();
//위 방식은 안됨
//몽구스, 몽고 연결/
console.log("init");
var PORT = 3000;
var handleListening = function handleListening() {
  return console.log("server listening on port http://localhost: ".concat(PORT));
};
_server["default"].listen(PORT, handleListening);