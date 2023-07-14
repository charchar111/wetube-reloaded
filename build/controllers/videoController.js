"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.watch = exports.search = exports.replyViewComment = exports.replyComment = exports.registerView = exports.postUpload = exports.postEdit = exports.likeComment = exports.home = exports.getUpload = exports.getEdit = exports.editComment = exports.deleteVideo = exports.deleteComment = exports.createComment = void 0;
var _Video = _interopRequireDefault(require("../models/Video"));
var _User = _interopRequireDefault(require("../models/User"));
var _comment = _interopRequireDefault(require("../models/comment"));
var _regeneratorRuntime2 = require("regenerator-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var home = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var videos;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _Video["default"].find({}).sort({
            createdAt: "desc"
          }).populate("owner");
        case 3:
          videos = _context.sent;
          return _context.abrupt("return", res.render("video/home", {
            pageTitle: "home",
            videos: videos
          }));
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log("server error: ", _context.t0);
          return _context.abrupt("return", res.status(404).render("serverError", {
            pageTitle: "error"
          }));
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.home = home;
var watch = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var id, video;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          _context2.next = 4;
          return _Video["default"].findById(id).populate("owner").populate("comments");
        case 4:
          video = _context2.sent;
          if (!video) {
            _context2.next = 13;
            break;
          }
          console.log(res.locals.loggedInUser._id);
          console.log(_typeof(res.locals.loggedInUser._id));
          console.log(video.owner._id);
          console.log(_typeof(video.owner._id.toString()));
          return _context2.abrupt("return", res.render("video/watch", {
            pageTitle: " ".concat(video.title),
            video: video
          }));
        case 13:
          return _context2.abrupt("return", (res.status(404).render("serverError"), {
            pageTitle: "error"
          }));
        case 14:
          _context2.next = 20;
          break;
        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          return _context2.abrupt("return", (res.status(400).render("serverError"), {
            pageTitle: "error"
          }));
        case 20:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 16]]);
  }));
  return function watch(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.watch = watch;
var getEdit = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var id, video;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return _Video["default"].findById(id);
        case 3:
          video = _context3.sent;
          console.log(video);
          if (video) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", (res.status(400).render("serverError"), {
            pageTitle: "error"
          }));
        case 7:
          if (!(String(video.owner) !== String(req.session.user._id))) {
            _context3.next = 10;
            break;
          }
          console.log("비정상적 접근 시도");
          return _context3.abrupt("return", res.redirect("/"));
        case 10:
          return _context3.abrupt("return", res.render("video/edit", {
            pageTitle: "Editing:".concat(video.title),
            video: video
          }));
        case 11:
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
    var id, _req$body, title, description, hashtags, videoCheck, video;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _req$body = req.body, title = _req$body.title, description = _req$body.description, hashtags = _req$body.hashtags;
          _context4.next = 4;
          return _Video["default"].exists({
            _id: id
          });
        case 4:
          videoCheck = _context4.sent;
          console.log(videoCheck);
          // 비디오존재 확인용
          if (videoCheck) {
            _context4.next = 10;
            break;
          }
          return _context4.abrupt("return", (res.status(404).render("serverError"), {
            pageTitle: "error"
          }));
        case 10:
          _context4.next = 12;
          return _Video["default"].findByIdAndUpdate(id, {
            title: title,
            description: description,
            hashtags: _Video["default"].formatHashtags(hashtags)
          }, {
            "new": true
          });
        case 12:
          video = _context4.sent;
          if (!(String(video.owner) !== String(req.session.user._id))) {
            _context4.next = 16;
            break;
          }
          console.log("비정상적 접근 시도");
          return _context4.abrupt("return", res.redirect("/"));
        case 16:
          req.flash("success", "video edit success!");
          res.redirect("/videos/".concat(id));
        case 18:
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
var search = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var keyword, videos;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          keyword = req.query.keyword;
          videos = [];
          if (!keyword) {
            _context5.next = 7;
            break;
          }
          _context5.next = 5;
          return _Video["default"].find({
            title: {
              $regex: new RegExp(keyword, "gim")
              // $regex: new RegExp(`^${keyword}`, "gim"),
            }
          }).populate("owner");
        case 5:
          videos = _context5.sent;
          console.log(videos);
        case 7:
          res.render("video/search", {
            pageTitle: "search",
            videos: videos
          });
        case 8:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function search(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.search = search;
var deleteVideo = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var id, error, video, deleteVideo, user;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          error = "비정상적 삭제 권한 접근 시도"; // console.log(id);
          // const video = await Video.findById(id);
          _context6.prev = 2;
          _context6.next = 5;
          return _Video["default"].findById(id);
        case 5:
          video = _context6.sent;
          _context6.next = 12;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](2);
          console.log("server error: ", _context6.t0);
          return _context6.abrupt("return", res.status(404).render("serverError", {
            pageTitle: "error"
          }));
        case 12:
          if (video) {
            _context6.next = 15;
            break;
          }
          console.log("server error: ", error);
          return _context6.abrupt("return", res.status(404).render("serverError", {
            pageTitle: "error"
          }));
        case 15:
          if (req.session.user) {
            _context6.next = 18;
            break;
          }
          console.log("server error: ", error);
          return _context6.abrupt("return", res.status(404).render("serverError", {
            pageTitle: "error"
          }));
        case 18:
          if (!(String(video.owner) !== String(req.session.user._id))) {
            _context6.next = 22;
            break;
          }
          req.flash("error", "you are not the owner of the video");
          console.log("비정상적 접근 시도");
          return _context6.abrupt("return", res.redirect("/"));
        case 22:
          _context6.next = 24;
          return _Video["default"].findByIdAndDelete(id);
        case 24:
          deleteVideo = _context6.sent;
          _context6.next = 27;
          return _User["default"].findById(deleteVideo.owner);
        case 27:
          user = _context6.sent;
          if (!user) {
            res.redirect("/");
          }
          // console.log("delete:" + deleteVideo);
          console.log(user);
          user.videos.splice(user.videos.indexOf(deleteVideo._id), 1);
          user.save();
          res.redirect("/");
        case 33:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[2, 8]]);
  }));
  return function deleteVideo(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.deleteVideo = deleteVideo;
var getUpload = function getUpload(req, res) {
  return res.render("video/upload", {
    pageTitle: "upload"
  });
};
exports.getUpload = getUpload;
var postUpload = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$files, video, thumb, _req$body2, title, description, hashtags, _id, newVideo, user;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          // here we will add a video to the video array
          console.log(req.files);
          _req$files = req.files, video = _req$files.video, thumb = _req$files.thumb;
          _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description, hashtags = _req$body2.hashtags;
          _id = req.session.user._id; // hashtag = hashtags.split(",").map((word) => `#${word.trim()}`);
          console.log(_id);
          _context7.prev = 5;
          console.log("비디오 파일 생성 시작");
          _context7.next = 9;
          return _Video["default"].create({
            title: title,
            description: description,
            fileUrl: video[0].path,
            thumbUrl: thumb[0].path,
            hashtags: _Video["default"].formatHashtags(hashtags),
            owner: _id
            // hashtags: hashtags.split(",").map((word) => `#${word.trim()}`),
          });
        case 9:
          newVideo = _context7.sent;
          _context7.next = 12;
          return _User["default"].findById(_id);
        case 12:
          user = _context7.sent;
          user.videos.push(newVideo._id);
          user.save();
          return _context7.abrupt("return", res.redirect("/"));
        case 18:
          _context7.prev = 18;
          _context7.t0 = _context7["catch"](5);
          res.status(400).render("video/upload", {
            pageTitle: "upload",
            errorMessage: _context7.t0
          });
        case 21:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[5, 18]]);
  }));
  return function postUpload(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

// api
exports.postUpload = postUpload;
var registerView = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var id, video;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          id = req.params.id;
          _context8.next = 3;
          return _Video["default"].findById(id);
        case 3:
          video = _context8.sent;
          if (video) {
            _context8.next = 6;
            break;
          }
          return _context8.abrupt("return", res.sendStatus(404));
        case 6:
          video.meta.views += 1;
          _context8.next = 9;
          return video.save();
        case 9:
          return _context8.abrupt("return", res.sendStatus(200));
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function registerView(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
exports.registerView = registerView;
var createComment = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var sessionUser, id, text, user, video, comment;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          sessionUser = req.session.user, id = req.params.id, text = req.body.text;
          _context9.prev = 1;
          _context9.next = 4;
          return _User["default"].findById(sessionUser._id);
        case 4:
          user = _context9.sent;
          _context9.next = 7;
          return _Video["default"].findById(id);
        case 7:
          video = _context9.sent;
          if (video) {
            _context9.next = 10;
            break;
          }
          return _context9.abrupt("return", res.sendStatus(404));
        case 10:
          _context9.next = 12;
          return _comment["default"].create({
            text: text,
            video: id,
            owner: sessionUser._id
            // meta, createdAt => default 값 입력
            // reply는 지금x
          });
        case 12:
          comment = _context9.sent;
          video.comments.unshift(comment._id);
          _context9.next = 16;
          return video.save();
        case 16:
          user.comments.unshift(comment._id);
          _context9.next = 19;
          return user.save();
        case 19:
          return _context9.abrupt("return", res.status(201).json({
            newCommentId: comment._id
          }));
        case 22:
          _context9.prev = 22;
          _context9.t0 = _context9["catch"](1);
          return _context9.abrupt("return", res.sendStatus(404));
        case 25:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[1, 22]]);
  }));
  return function createComment(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
exports.createComment = createComment;
var deleteComment = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var videoId, commentId, video, user, comment;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          console.log("delete comment");
          videoId = req.params.videoId;
          commentId = req.params.commentId;
          _context10.prev = 3;
          _context10.next = 6;
          return _Video["default"].findById(videoId);
        case 6:
          video = _context10.sent;
          if (video) {
            _context10.next = 9;
            break;
          }
          return _context10.abrupt("return", res.sendStatus(404));
        case 9:
          _context10.next = 11;
          return _User["default"].findById(req.session.user._id);
        case 11:
          user = _context10.sent;
          if (user) {
            _context10.next = 14;
            break;
          }
          return _context10.abrupt("return", res.sendStatus(404));
        case 14:
          _context10.next = 16;
          return _comment["default"].findOne({
            _id: commentId
          });
        case 16:
          comment = _context10.sent;
          if (comment) {
            _context10.next = 19;
            break;
          }
          return _context10.abrupt("return", res.sendStatus(404));
        case 19:
          if (!(comment.owner.toString() !== req.session.user._id)) {
            _context10.next = 22;
            break;
          }
          console.log("아이디 불일치, 삭제 거부");
          return _context10.abrupt("return", res.sendStatus(400));
        case 22:
          _context10.next = 24;
          return _comment["default"].findByIdAndDelete(commentId);
        case 24:
          // user 도큐먼트에서 comment id 삭제
          user.comments = user.comments.filter(function (id) {
            return id.toString() !== commentId;
          });
          user.save();

          // user 도큐먼트에서 comment id 삭제
          video.comments = video.comments.filter(function (id) {
            return id.toString() !== commentId;
          });
          video.save();
          return _context10.abrupt("return", res.sendStatus(200));
        case 31:
          _context10.prev = 31;
          _context10.t0 = _context10["catch"](3);
          console.log(_context10.t0);
          return _context10.abrupt("return", res.sendStatus(404));
        case 35:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[3, 31]]);
  }));
  return function deleteComment(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
exports.deleteComment = deleteComment;
var editComment = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var _req$params, videoId, commentId, text, video, user, comment;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          console.log("editComment");
          _req$params = req.params, videoId = _req$params.videoId, commentId = _req$params.commentId;
          text = req.body.text;
          _context11.prev = 3;
          _context11.next = 6;
          return _Video["default"].findById(videoId);
        case 6:
          video = _context11.sent;
          if (video) {
            _context11.next = 9;
            break;
          }
          return _context11.abrupt("return", res.sendStatus(404));
        case 9:
          _context11.next = 11;
          return _User["default"].findById(req.session.user._id);
        case 11:
          user = _context11.sent;
          if (user) {
            _context11.next = 14;
            break;
          }
          return _context11.abrupt("return", res.sendStatus(404));
        case 14:
          _context11.next = 16;
          return _comment["default"].findOne({
            _id: commentId
          });
        case 16:
          comment = _context11.sent;
          if (comment) {
            _context11.next = 19;
            break;
          }
          return _context11.abrupt("return", res.sendStatus(404));
        case 19:
          if (!(comment.owner.toString() !== req.session.user._id)) {
            _context11.next = 22;
            break;
          }
          console.log("아이디 불일치, 삭제 거부");
          return _context11.abrupt("return", res.sendStatus(400));
        case 22:
          _context11.next = 24;
          return _comment["default"].findByIdAndUpdate(commentId, {
            text: text
          });
        case 24:
          return _context11.abrupt("return", res.sendStatus(200));
        case 27:
          _context11.prev = 27;
          _context11.t0 = _context11["catch"](3);
          console.log(_context11.t0);
          return _context11.abrupt("return", res.sendStatus(404));
        case 31:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[3, 27]]);
  }));
  return function editComment(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();
exports.editComment = editComment;
var likeComment = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var _req$params2, videoId, commentId, video, user, comment;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          console.log("likeComment");
          _req$params2 = req.params, videoId = _req$params2.videoId, commentId = _req$params2.commentId;
          console.log(req.session.user._id);
          _context12.prev = 3;
          _context12.next = 6;
          return _Video["default"].findById(videoId);
        case 6:
          video = _context12.sent;
          if (video) {
            _context12.next = 9;
            break;
          }
          return _context12.abrupt("return", res.sendStatus(404));
        case 9:
          _context12.next = 11;
          return _User["default"].findById(req.session.user._id);
        case 11:
          user = _context12.sent;
          if (user) {
            _context12.next = 14;
            break;
          }
          return _context12.abrupt("return", res.sendStatus(404));
        case 14:
          _context12.next = 16;
          return _comment["default"].findById(commentId);
        case 16:
          comment = _context12.sent;
          if (comment) {
            _context12.next = 19;
            break;
          }
          return _context12.abrupt("return", res.sendStatus(404));
        case 19:
          if (!comment.meta.like.users.includes(req.session.user._id)) {
            _context12.next = 27;
            break;
          }
          console.log("좋아요 제거");
          comment.meta.like.count -= 1;
          comment.meta.like.users = comment.meta.like.users.filter(function (id) {
            return id.toString() !== req.session.user._id;
          });
          comment.save();
          return _context12.abrupt("return", res.status(200).json({
            count: comment.meta.like.count,
            user: "remove"
          }));
        case 27:
          console.log("좋아요 추가");
          comment.meta.like.count += 1;
          comment.meta.like.users.push(req.session.user._id);
          comment.save();
          return _context12.abrupt("return", res.status(200).json({
            count: comment.meta.like.count,
            user: "add"
          }));
        case 32:
          _context12.next = 38;
          break;
        case 34:
          _context12.prev = 34;
          _context12.t0 = _context12["catch"](3);
          console.log(_context12.t0);
          return _context12.abrupt("return", res.sendStatus(404));
        case 38:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[3, 34]]);
  }));
  return function likeComment(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();
exports.likeComment = likeComment;
var replyComment = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var _req$params3, videoId, commentId, text, video, user, comment, reply;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          console.log("replyComment");
          _req$params3 = req.params, videoId = _req$params3.videoId, commentId = _req$params3.commentId;
          text = req.body.text;
          console.log("text");
          console.log(text);
          _context13.prev = 5;
          _context13.next = 8;
          return _Video["default"].findById(videoId);
        case 8:
          video = _context13.sent;
          if (video) {
            _context13.next = 11;
            break;
          }
          return _context13.abrupt("return", res.sendStatus(404));
        case 11:
          _context13.next = 13;
          return _User["default"].findById(req.session.user._id);
        case 13:
          user = _context13.sent;
          if (user) {
            _context13.next = 16;
            break;
          }
          return _context13.abrupt("return", res.sendStatus(404));
        case 16:
          _context13.next = 18;
          return _comment["default"].findOne({
            _id: commentId
          });
        case 18:
          comment = _context13.sent;
          if (comment) {
            _context13.next = 21;
            break;
          }
          return _context13.abrupt("return", res.sendStatus(404));
        case 21:
          if (!(comment.owner.toString() !== req.session.user._id)) {
            _context13.next = 24;
            break;
          }
          console.log("아이디 불일치, 삭제 거부");
          return _context13.abrupt("return", res.sendStatus(400));
        case 24:
          _context13.next = 26;
          return _comment["default"].create({
            text: text,
            video: videoId,
            owner: req.session.user._id,
            reply: {
              "class": 1,
              group: comment._id
            }

            // meta, createdAt => default 값 입력
            // reply는 지금x
          });
        case 26:
          reply = _context13.sent;
          comment.reply.group.push(reply._id);
          comment.save();
          user.comments.unshift(reply._id);
          _context13.next = 32;
          return user.save();
        case 32:
          return _context13.abrupt("return", res.status(201).json({
            newCommentId: reply._id
          }));
        case 35:
          _context13.prev = 35;
          _context13.t0 = _context13["catch"](5);
          console.log(_context13.t0);
          return _context13.abrupt("return", res.sendStatus(404));
        case 39:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[5, 35]]);
  }));
  return function replyComment(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();
exports.replyComment = replyComment;
var replyViewComment = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var _req$params4, videoId, commentId, video, comments;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          console.log("replyViewComment");
          _req$params4 = req.params, videoId = _req$params4.videoId, commentId = _req$params4.commentId;
          _context14.prev = 2;
          _context14.next = 5;
          return _Video["default"].findById(videoId);
        case 5:
          video = _context14.sent;
          if (video) {
            _context14.next = 8;
            break;
          }
          return _context14.abrupt("return", res.sendStatus(404));
        case 8:
          _context14.next = 10;
          return _comment["default"].findById(commentId).populate({
            path: "reply.group",
            populate: {
              path: "owner",
              select: "username",
              model: "User"
            }
          });
        case 10:
          comments = _context14.sent;
          if (comments) {
            _context14.next = 13;
            break;
          }
          return _context14.abrupt("return", res.sendStatus(404));
        case 13:
          return _context14.abrupt("return", res.status(200).json({
            replys: comments.reply.group
          }));
        case 16:
          _context14.prev = 16;
          _context14.t0 = _context14["catch"](2);
          console.log(_context14.t0);
          return _context14.abrupt("return", res.sendStatus(404));
        case 20:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[2, 16]]);
  }));
  return function replyViewComment(_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();
exports.replyViewComment = replyViewComment;