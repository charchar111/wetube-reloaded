"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startKakaoLogin = exports.startGithubLogin = exports.see = exports.remove = exports.processOneKakaoLogin = exports.postLogin = exports.postJoin = exports.postEdit = exports.postChangePassword = exports.logout = exports.getLogin = exports.getJoin = exports.getEdit = exports.getChangePassword = exports.finishGithubLogin = void 0;
var _User = _interopRequireDefault(require("../models/User"));
var _Video = _interopRequireDefault(require("../models/Video"));
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getJoin = function getJoin(req, res) {
  res.render("user/join", {
    pageTitle: "Join"
  });
};
exports.getJoin = getJoin;
var postJoin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var pageTitle, _req$body, name, email, username, password, password2, location, exists;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          pageTitle = "Join";
          _req$body = req.body, name = _req$body.name, email = _req$body.email, username = _req$body.username, password = _req$body.password, password2 = _req$body.password2, location = _req$body.location;
          console.log(req.body);
          if (!(password !== password2)) {
            _context.next = 5;
            break;
          }
          return _context.abrupt("return", res.status(400).render("user/join", {
            pageTitle: pageTitle,
            errorMessage: "This password confirmation does not match."
          }));
        case 5:
          _context.next = 7;
          return _User["default"].exists({
            $or: [{
              username: username
            }, {
              email: email
            }]
          });
        case 7:
          exists = _context.sent;
          if (!exists) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", res.status(400).render("user/join", {
            pageTitle: pageTitle,
            errorMessage: "This username or email is already taken."
          }));
        case 10:
          _context.prev = 10;
          _context.next = 13;
          return _User["default"].create({
            name: name,
            email: email,
            username: username,
            password: password,
            location: location
          });
        case 13:
          return _context.abrupt("return", res.redirect("/login"));
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](10);
          console.log("error: " + _context.t0);
          return _context.abrupt("return", (res.status(400).render("serverError"), {
            pageTitle: "error"
          }));
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[10, 16]]);
  }));
  return function postJoin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.postJoin = postJoin;
var startGithubLogin = function startGithubLogin(req, res) {
  var baseUrl = "https://github.com/login/oauth/authorize";
  var config = {
    client_id: process.env.GH_CLIENT,
    scope: "user:email read:user",
    allow_signup: false
  };
  var params = new URLSearchParams(config).toString();
  var finalUrl = "".concat(baseUrl, "?").concat(params);
  return res.redirect(finalUrl);
};
exports.startGithubLogin = startGithubLogin;
var finishGithubLogin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var baseUrl, config, params, finalUrl, tokenRequest, access_token, apiUrl, userData, emailData, emailObj, user;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          baseUrl = "https://github.com/login/oauth/access_token";
          config = {
            client_id: process.env.GH_CLIENT,
            client_secret: process.env.GH_SECRET,
            code: req.query.code
          };
          params = new URLSearchParams(config).toString();
          finalUrl = "".concat(baseUrl, "?").concat(params);
          _context2.next = 6;
          return (0, _nodeFetch["default"])(finalUrl, {
            method: "POST",
            headers: {
              Accept: "application/json"
            }
          });
        case 6:
          _context2.next = 8;
          return _context2.sent.json();
        case 8:
          tokenRequest = _context2.sent;
          if (!("access_token" in tokenRequest)) {
            _context2.next = 44;
            break;
          }
          access_token = tokenRequest.access_token;
          apiUrl = "https://api.github.com";
          _context2.next = 14;
          return (0, _nodeFetch["default"])("".concat(apiUrl, "/user"), {
            headers: {
              Authorization: "Bearer ".concat(access_token)
              // token?
            }
          });
        case 14:
          _context2.next = 16;
          return _context2.sent.json();
        case 16:
          userData = _context2.sent;
          console.log(userData);
          _context2.next = 20;
          return (0, _nodeFetch["default"])("".concat(apiUrl, "/user/emails"), {
            headers: {
              Authorization: "Bearer ".concat(access_token)
            }
          });
        case 20:
          _context2.next = 22;
          return _context2.sent.json();
        case 22:
          emailData = _context2.sent;
          console.log("email");
          emailObj = emailData.find(function (element) {
            return element.primary === true && element.verified === true;
          }); // console.log(emailData);
          console.log(emailObj);
          if (emailObj) {
            _context2.next = 28;
            break;
          }
          return _context2.abrupt("return", res.redirect("/login"));
        case 28:
          _context2.next = 30;
          return _User["default"].findOne({
            email: emailObj.email
          });
        case 30:
          user = _context2.sent;
          if (user) {
            _context2.next = 39;
            break;
          }
          console.log("need to create account");
          //create an account
          // 깃헙 아이디 만으로 비밀번호 생성 없이 계정 만들기
          _context2.next = 35;
          return _User["default"].create({
            avatarUrl: userData.avatar_url,
            name: userData.name ? userData.name : "Unknown",
            email: emailObj.email,
            username: userData.login,
            password: "",
            socialOnly: true,
            location: userData.location ? userData.location : "Unknown"
          });
        case 35:
          user = _context2.sent;
          req.session.loggedIn = true;
          req.session.user = user;
          return _context2.abrupt("return", res.redirect("/"));
        case 39:
          req.session.loggedIn = true;
          req.session.user = user;
          return _context2.abrupt("return", res.redirect("/login"));
        case 44:
          return _context2.abrupt("return", res.redirect("/login"));
        case 45:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function finishGithubLogin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.finishGithubLogin = finishGithubLogin;
var startKakaoLogin = function startKakaoLogin(req, res) {
  var restApiKey = "edf57a93edb6b19376f5a9529b2ba0db";
  var redirectUrl = "http://localhost:3000/users/kakaotalk/process-one";
  return res.redirect("https://kauth.kakao.com/oauth/authorize?client_id=".concat(restApiKey, "&redirect_uri=").concat(redirectUrl, "&response_type=code"));
};
exports.startKakaoLogin = startKakaoLogin;
var processOneKakaoLogin = function processOneKakaoLogin(req, res) {
  // console.log(req.query);
  if (req.query.error) {
    console.log(req.query.error);
    console.log(req.query.error_description);
    return res.redirect("/");
  }
  console.log("정상 승인");
  var code = req.query.code;
  return res.redirect("/");
};
exports.processOneKakaoLogin = processOneKakaoLogin;
var remove = function remove(req, res) {
  return res.send("delete user");
};
exports.remove = remove;
var getEdit = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", res.render("user/editProfile", {
            pageTitle: "edit-profile"
          }));
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getEdit(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getEdit = getEdit;
var postEdit = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$session$user, _id, sessionEmail, sessionUsername, avatarUrl, _req$body2, name, username, location, email, file, searchParam, foundUser;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$session$user = req.session.user, _id = _req$session$user._id, sessionEmail = _req$session$user.email, sessionUsername = _req$session$user.username, avatarUrl = _req$session$user.avatarUrl, _req$body2 = req.body, name = _req$body2.name, username = _req$body2.username, location = _req$body2.location, email = _req$body2.email, file = req.file;
          console.log(req.file);
          // console.log(path);
          searchParam = [];
          if (sessionEmail !== email) {
            searchParam.push({
              email: email
            });
          }
          if (sessionUsername !== username) {
            searchParam.push({
              username: username
            });
          }
          if (!(searchParam.length > 0)) {
            _context4.next = 11;
            break;
          }
          _context4.next = 8;
          return _User["default"].findOne({
            $or: searchParam
          });
        case 8:
          foundUser = _context4.sent;
          if (!(foundUser && foundUser._id.toString() !== _id)) {
            _context4.next = 11;
            break;
          }
          return _context4.abrupt("return", res.status(400).render("editProfile", {
            pageTitle: "edit-profile",
            errorMessage: "This username or email is already taken."
          }));
        case 11:
          _context4.next = 13;
          return _User["default"].findByIdAndUpdate(_id, {
            avatarUrl: file ? "/".concat(file.path) : avatarUrl,
            name: name,
            username: username,
            location: location,
            email: email
          }, {
            "new": true
          });
        case 13:
          req.session.user = _objectSpread(_objectSpread({}, req.session.user), {}, {
            name: name,
            username: username,
            email: email,
            location: location,
            avatarUrl: file ? "/".concat(file.path) : avatarUrl
          });
          console.log("업데이트 완료 후, 컨트롤러에서의 세션 유저");
          console.log(req.session.user);
          return _context4.abrupt("return", res.redirect("/users/edit-profile"));
        case 17:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function postEdit(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.postEdit = postEdit;
var getChangePassword = function getChangePassword(req, res) {
  if (req.session.user.socialOnly === true) {
    console.log("sns 유저는 비밀번호 변경 불가");
    req.flash("info", "sns user can't change password");
    return res.redirect("/");
  }
  return res.render("user/change-password", {
    pageTitle: "change Password"
  });
};
exports.getChangePassword = getChangePassword;
var postChangePassword = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$session$user2, _id, password, _req$body3, oldPassword, newPassword, newPasswordConfirmation, ok, errorMessage, _errorMessage, user;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          // send notification
          _req$session$user2 = req.session.user, _id = _req$session$user2._id, password = _req$session$user2.password, _req$body3 = req.body, oldPassword = _req$body3.oldPassword, newPassword = _req$body3.newPassword, newPasswordConfirmation = _req$body3.newPasswordConfirmation;
          _context5.next = 3;
          return _bcrypt["default"].compare(oldPassword, password);
        case 3:
          ok = _context5.sent;
          console.log(ok);
          if (ok) {
            _context5.next = 8;
            break;
          }
          errorMessage = "The current password is incorrect";
          return _context5.abrupt("return", res.status(400).render("user/change-password", {
            pageTitle: "change Password",
            errorMessage: errorMessage
          }));
        case 8:
          if (!(newPassword !== newPasswordConfirmation)) {
            _context5.next = 11;
            break;
          }
          _errorMessage = "the new password does not match confirmation. ";
          return _context5.abrupt("return", res.status(400).render("user/change-password", {
            pageTitle: "change Password",
            errorMessage: _errorMessage
          }));
        case 11:
          _context5.next = 13;
          return _User["default"].findById(_id);
        case 13:
          user = _context5.sent;
          user.password = newPassword;
          _context5.next = 17;
          return user.save();
        case 17:
          req.flash("info", "Password updated");
          req.session.user.password = user.password;
          return _context5.abrupt("return", res.redirect("/users/logout"));
        case 20:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function postChangePassword(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.postChangePassword = postChangePassword;
var getLogin = function getLogin(req, res) {
  return res.render("user/login", {
    pageTitle: "Login"
  });
};
exports.getLogin = getLogin;
var postLogin = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var pageTitle, _req$body4, username, password, user, match;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          pageTitle = "Login";
          _req$body4 = req.body, username = _req$body4.username, password = _req$body4.password;
          _context6.next = 4;
          return _User["default"].findOne({
            username: username,
            socialOnly: false
          });
        case 4:
          user = _context6.sent;
          if (user) {
            _context6.next = 7;
            break;
          }
          return _context6.abrupt("return", res.status(400).render("user/login", {
            pageTitle: pageTitle,
            errorMessage: "An account with this username does not exists."
          }));
        case 7:
          _context6.next = 9;
          return _User["default"].comparePassword(password, user.password);
        case 9:
          match = _context6.sent;
          if (match) {
            _context6.next = 12;
            break;
          }
          return _context6.abrupt("return", res.status(400).render("user/login", {
            pageTitle: pageTitle,
            errorMessage: "this password does not match with account's password."
          }));
        case 12:
          req.session.loggedIn = true;
          req.session.user = user;
          return _context6.abrupt("return", res.redirect("/"));
        case 15:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function postLogin(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.postLogin = postLogin;
var logout = function logout(req, res) {
  console.log("로그아웃");
  req.session.user = null;
  req.session.loggedIn = false;
  req.flash("info", "Bye Bye");
  return res.redirect("/");
};
exports.logout = logout;
var see = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var id, user;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;
          _context7.prev = 1;
          _context7.next = 4;
          return _User["default"].findById(id).populate({
            path: "videos",
            populate: {
              path: "owner",
              model: "User"
            }
          });
        case 4:
          user = _context7.sent;
          if (user) {
            _context7.next = 7;
            break;
          }
          return _context7.abrupt("return", (res.status(404).render("serverError"), {
            pageTitle: "error"
          }));
        case 7:
          return _context7.abrupt("return", res.render("user/profile", {
            pageTitle: "".concat(user.username),
            user: user
          }));
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](1);
          console.log(_context7.t0);
          return _context7.abrupt("return", (res.status(404).render("serverError"), {
            pageTitle: "error"
          }));
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[1, 10]]);
  }));
  return function see(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
exports.see = see;