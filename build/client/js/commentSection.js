"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _regeneratorRuntime2 = require("regenerator-runtime");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var videoContainer = document.getElementById("videoContainer");
var form = document.getElementById("commentForm");
var videoCommentRow = document.querySelectorAll(".video-comment");
var videoli = document.querySelectorAll(".video-comment.max-height");
console.log(videoli);

// 중복 실행 방지용 변수
var duplicatedExcute = false;
var handleReplyViewBtnClose = function handleReplyViewBtnClose(event) {
  console.log("닫기 버튼");
  // const replys = event.target.parentElement.parentElement;
  var replys = event.target.parentElement.parentElement.querySelector(".reply-section");
  // console.log(replys);
  replys.remove();
  event.target.innerText = "view reply";
  event.target.removeEventListener("click", handleReplyViewBtnClose);
  event.target.addEventListener("click", handleReplyViewBtn);
  // event.target.parentElement.parentElement.querySelector("")
};

var replyViewHTML = function replyViewHTML(username, text, target) {
  console.log(username);
  console.log(text);
  var div = document.createElement("div");
  div.className = "reply-column";
  var pName = document.createElement("p");
  pName.className = "reply-column__name";
  pName.innerText = username;
  div.appendChild(pName);
  var pText = document.createElement("p");
  pText.className = "reply-column__text";
  pText.innerText = text;
  div.appendChild(pText);
  target.appendChild(div);
};
var handleReplyViewBtn = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(event) {
    var videoId, commentId, response, responseJson, replyContainer, replySection;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log("리플라이 보기 버튼 클릭");
          videoId = videoContainer.dataset.videoId;
          commentId = event.target.parentElement.parentElement.parentElement.dataset.commentId;
          _context.next = 5;
          return fetch("/api/videos/".concat(videoId, "/comment/").concat(commentId, "/reply/view"), {
            method: "post"
          });
        case 5:
          response = _context.sent;
          if (!(response.status == 200)) {
            _context.next = 19;
            break;
          }
          event.target.innerText = "close reply";
          event.target.removeEventListener("click", handleReplyViewBtn);
          event.target.addEventListener("click", handleReplyViewBtnClose);
          _context.next = 12;
          return response.json();
        case 12:
          responseJson = _context.sent;
          replyContainer = event.target.parentElement.parentElement.parentElement.querySelector(".reply-container");
          console.log(replyContainer);
          replySection = document.createElement("div");
          replySection.className = "reply-section";
          replyContainer.appendChild(replySection);
          responseJson.replys.forEach(function (element) {
            console.log(element);
            replyViewHTML(element.owner.username, element.text, replySection);
          });
        case 19:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function handleReplyViewBtn(_x) {
    return _ref.apply(this, arguments);
  };
}();
var addReply = function addReply(id) {
  console.log(id);
};
var handleSubmitBtn = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(event) {
    var videoId, commentId, text, response, responseJson;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          event.preventDefault();
          console.log("리플라이 제출 버튼 클릭");
          videoId = videoContainer.dataset.videoId;
          commentId = event.target.parentElement.parentElement.dataset.commentId;
          text = event.target.querySelector("input[name=reply]").value;
          _context2.next = 7;
          return fetch("/api/videos/".concat(videoId, "/comment/").concat(commentId, "/reply"), {
            method: "post",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              text: text
            })
          });
        case 7:
          response = _context2.sent;
          _context2.next = 10;
          return response.json();
        case 10:
          responseJson = _context2.sent;
          if (response.status == 201) {
            console.log("리플라이 제출 성공");
            event.target.querySelector("input[name=reply]").value = "";
            addReply(responseJson.newCommentId);
          }
          return _context2.abrupt("return");
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function handleSubmitBtn(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var handleCancelBtn = function handleCancelBtn(event) {
  console.log("리플라이 캔슬 클릭");
  var form = event.target.parentElement;
  var replyAddBtn = event.target.parentElement.parentElement.querySelector(".reply-add-btn");
  form.remove();
  replyAddBtn.addEventListener("click", handleReplyBtn);
};
var handleReplyBtn = function handleReplyBtn(event) {
  console.log("리플라이 클릭");
  event.target.removeEventListener("click", handleReplyBtn);
  var form = document.createElement("form");
  form.className = "reply-add";
  var input = document.createElement("input");
  input.name = "reply";
  form.appendChild(input);
  var cancelBtn = document.createElement("button");
  cancelBtn.className = "reply-add__cancel";
  cancelBtn.innerText = "cancel";
  cancelBtn.type = "button";
  form.appendChild(cancelBtn);
  var submitBtn = document.createElement("button");
  submitBtn.className = "reply-add__reply";
  submitBtn.innerText = "reply";
  form.appendChild(submitBtn);
  event.target.parentElement.appendChild(form);
  cancelBtn.addEventListener("click", handleCancelBtn);
  form.addEventListener("submit", handleSubmitBtn);
};

// 핸들러:
var handleLikeBtn = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(event) {
    var videoId, commentId, responseRaw, response;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          // console.log("시작 전 duplicatedExcute");
          // console.log(duplicatedExcute);
          // if (duplicatedExcute == true) {
          //   console.log("중복 실행 요청 거부");
          //   event.preventDefault();
          //   return;
          // }
          // duplicatedExcute = true;
          console.log("좋아요 클릭");
          videoId = videoContainer.dataset.videoId;
          commentId = event.target.parentElement.parentElement.parentElement.dataset.commentId;
          _context3.next = 5;
          return fetch("/api/videos/".concat(videoId, "/comment/").concat(commentId, "/like"), {
            method: "post"
          });
        case 5:
          responseRaw = _context3.sent;
          if (!(responseRaw.status == 303)) {
            _context3.next = 10;
            break;
          }
          console.log("비 로그인 오류");
          console.log(responseRaw);
          return _context3.abrupt("return", window.location.href = "http://localhost:3000/");
        case 10:
          _context3.next = 12;
          return responseRaw.json();
        case 12:
          response = _context3.sent;
          event.target.parentElement.querySelector(".like-button__count").innerText = response.count;
          if (response.user === "add") {
            console.log("성공, 좋아요 변경");
            event.target.classList.remove("fa-regular");
            event.target.classList.add("fa-solid");
          } else if (response.user === "remove") {
            console.log("실패");
            event.target.classList.remove("fa-solid");
            event.target.classList.add("fa-regular");
          }
          return _context3.abrupt("return");
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function handleLikeBtn(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

// 핸들러: 이벤트 리스너handleCommitEdit1 제거(댓글 수정 폼 중복 추가 방지)
var handleCommitEdit2 = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(event) {
    var videoId, commentId, text, response, comment, videoComment;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          event.preventDefault();
          videoId = videoContainer.dataset.videoId;
          commentId = event.target.parentElement.dataset.commentId;
          text = event.target.querySelector("input[data-comment-edit = input-text]").value;
          _context4.next = 6;
          return fetch("/api/videos/".concat(videoId, "/comment/").concat(commentId, "/edit"), {
            headers: {
              "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify({
              text: text
            })
          });
        case 6:
          response = _context4.sent;
          if (response.status === 200) {
            comment = event.target.parentElement.querySelector("span.video-comment__text");
            console.log("comment");
            console.log(comment);
            comment.innerText = text;
            videoComment = event.target.parentElement.querySelector("i.fas.fa-pen");
            event.srcElement.remove();
            videoComment.addEventListener("click", handleCommitEdit1);
          }
        case 8:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function handleCommitEdit2(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

// 핸들러: 댓글 수정용 html 추가, 이벤트 리스너 handleCommitEdit2 추가
var handleCommitEdit1 = function handleCommitEdit1(event) {
  console.log("edit1");
  console.log(event);
  event.srcElement.removeEventListener("click", handleCommitEdit1);
  var newForm = document.createElement("form");
  newForm.className = "video-comment__input";
  newForm.dataset.commentEdit = "form";
  var newInput = document.createElement("input");
  newInput.type = "text";
  newInput.dataset.commentEdit = "input-text";
  newInput.name = "text";
  newForm.appendChild(newInput);
  var newBtn = document.createElement("button");
  newForm.appendChild(newBtn);
  event.target.parentElement.appendChild(newForm);
  return newForm.addEventListener("submit", handleCommitEdit2);
};
var handleCommitDelete = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(event) {
    var videoId, commentId, response;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          videoId = videoContainer.dataset.videoId;
          commentId = event.target.parentElement.dataset.commentId; // 백엔드 db에서 코멘트 도큐먼트, relationship 도큐먼트에서 id 삭제
          _context5.next = 4;
          return fetch("/api/videos/".concat(videoId, "/comment/").concat(commentId, "/delete"), {
            method: "delete"
          });
        case 4:
          response = _context5.sent;
          // fake delete 구현 : html 삭제
          if (response.status === 200) {
            event.target.parentElement.remove();
          }
        case 6:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function handleCommitDelete(_x5) {
    return _ref5.apply(this, arguments);
  };
}();
var addComment = function addComment(text, id) {
  var videoComments = document.querySelector(".video__comments ul");
  var newComment = document.createElement("li");
  newComment.dataset.commentId = id;
  newComment.className = "video-comment max-height";
  var icon = document.createElement("i");
  icon.className = "fas fa-comment";
  newComment.appendChild(icon);
  var span = document.createElement("span");
  span.className = "video-comment__text";
  span.innerText = text;
  newComment.appendChild(span);
  var editicon = document.createElement("i");
  editicon.className = "fas fa-pen";
  newComment.appendChild(editicon);
  var Xicon = document.createElement("i");
  Xicon.className = "fas fa-xmark";
  newComment.appendChild(Xicon);
  var likeDiv = document.createElement("div");
  var likeBtn = document.createElement("span");
  likeBtn.className = "like button";
  var likeIcon = document.createElement("i");
  likeIcon.className = "fa-thumbs-up fa-regular";
  likeBtn.appendChild(likeIcon);
  var likeCount = document.createElement("span");
  likeCount.className = "like-button__count";
  likeCount.innerText = 0;
  likeBtn.appendChild(likeCount);
  var unlikeBtn = document.createElement("span");
  unlikeBtn.className = "unlike button";
  var unlikeIcon = document.createElement("i");
  unlikeIcon.className = "fa-regular fa-thumbs-down";
  unlikeBtn.appendChild(unlikeIcon);
  likeDiv.appendChild(likeBtn);
  likeDiv.appendChild(unlikeBtn);
  newComment.appendChild(likeDiv);
  videoComments.prepend(newComment);
  likeIcon.addEventListener("click", handleLikeBtn);
  var newCommentDeleteBtn = newComment.querySelector(".video__comments i.fas.fa-xmark");
  var newCommentEditBtn = newComment.querySelector(".video__comments i.fas.fa-pen");
  newCommentDeleteBtn.addEventListener("click", handleCommitDelete);
  newCommentEditBtn.addEventListener("click", handleCommitEdit1);
};
var handleSubmit = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(event) {
    var textarea, videoId, text, response, _yield$response$json, newCommentId;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          console.log("시작 전 duplicatedExcute");
          console.log(duplicatedExcute);
          if (!(duplicatedExcute == true)) {
            _context6.next = 6;
            break;
          }
          console.log("중복 실행 요청 거부");
          event.preventDefault();
          return _context6.abrupt("return");
        case 6:
          duplicatedExcute = true;
          event.preventDefault();
          textarea = form.querySelector("textarea");
          videoId = videoContainer.dataset.videoId;
          text = textarea.value;
          if (!(text.trim() === "")) {
            _context6.next = 14;
            break;
          }
          duplicatedExcute = false;
          return _context6.abrupt("return");
        case 14:
          _context6.next = 16;
          return fetch("/api/videos/".concat(videoId, "/comment"), {
            method: "post",
            headers: {
              // "Content-Type": "text/plain",
              "Content-Type": "application/json"
            },
            // body: text,
            body: JSON.stringify({
              text: text
            })
          });
        case 16:
          response = _context6.sent;
          textarea.value = "";
          // window.location.reload();
          if (!(response.status === 201)) {
            _context6.next = 31;
            break;
          }
          console.log("create fake conment");
          _context6.next = 22;
          return response.json();
        case 22:
          _yield$response$json = _context6.sent;
          newCommentId = _yield$response$json.newCommentId;
          duplicatedExcute = false;
          console.log("완료 후 duplicatedExcute");
          console.log(duplicatedExcute);
          addComment(text, newCommentId);
          return _context6.abrupt("return");
        case 31:
          console.log("완료 후 duplicatedExcute");
          duplicatedExcute = false;
          console.log(duplicatedExcute);
          return _context6.abrupt("return");
        case 35:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function handleSubmit(_x6) {
    return _ref6.apply(this, arguments);
  };
}();
if (form) {
  form.addEventListener("submit", handleSubmit);
  // 댓글 추가
}

// 조건, 댓글이 하나 이상 있을 때
if (videoCommentRow.length != 0) {
  // 이벤트: 댓글 삭제
  var commentDeleteBtns = document.querySelectorAll(".video__comments i.fas.fa-xmark");
  commentDeleteBtns.forEach(function (element) {
    element.addEventListener("click", handleCommitDelete);
  });

  // 이벤트: 댓글 수정
  var commentEditBtns = document.querySelectorAll(".video__comments i.fas.fa-pen");
  commentEditBtns.forEach(function (element) {
    element.addEventListener("click", handleCommitEdit1);
  });

  //  이벤트: 좋아요 버튼
  var commentLikeBtns = document.querySelectorAll(".video__comments .fa-thumbs-up");
  commentLikeBtns.forEach(function (element) {
    element.addEventListener("click", handleLikeBtn);
  });

  // 이벤트 리플라이 추가 버튼
  var commentReplyAddBtns = document.querySelectorAll(".video__comments .reply-add-btn");
  commentReplyAddBtns.forEach(function (element) {
    element.addEventListener("click", handleReplyBtn);
  });

  // 이벤트 리플라이 보기 버튼
  var commentReplyViewBtns = document.querySelectorAll(".video__comments .reply-view-btn span");
  commentReplyViewBtns.forEach(function (element) {
    element.addEventListener("click", handleReplyViewBtn);
  });
}