import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoCommentRow = document.querySelectorAll(".video-comment");
const videoli = document.querySelectorAll(".video-comment.max-height");
console.log(videoli);

// 중복 실행 방지용 변수
let duplicatedExcute = false;

const handleReplyViewBtnClose = (event) => {
  console.log("닫기 버튼");
  // const replys = event.target.parentElement.parentElement;
  const replys =
    event.target.parentElement.parentElement.querySelector(".reply-section");
  // console.log(replys);
  replys.remove();
  event.target.innerText = "view reply";
  event.target.removeEventListener("click", handleReplyViewBtnClose);
  event.target.addEventListener("click", handleReplyViewBtn);
  // event.target.parentElement.parentElement.querySelector("")
};

const replyViewHTML = (username, text, target) => {
  console.log(username);
  console.log(text);

  const div = document.createElement("div");
  div.className = "reply-column";

  const pName = document.createElement("p");
  pName.className = "reply-column__name";
  pName.innerText = username;
  div.appendChild(pName);

  const pText = document.createElement("p");
  pText.className = "reply-column__text";
  pText.innerText = text;
  div.appendChild(pText);

  target.appendChild(div);
};

const handleReplyViewBtn = async (event) => {
  console.log("리플라이 보기 버튼 클릭");

  const { videoId } = videoContainer.dataset;
  const { commentId } =
    event.target.parentElement.parentElement.parentElement.dataset;

  const response = await fetch(
    `/api/videos/${videoId}/comment/${commentId}/reply/view`,
    {
      method: "post",
    }
  );

  if (response.status == 200) {
    event.target.innerText = "close reply";
    event.target.removeEventListener("click", handleReplyViewBtn);
    event.target.addEventListener("click", handleReplyViewBtnClose);
    const responseJson = await response.json();
    const replyContainer =
      event.target.parentElement.parentElement.parentElement.querySelector(
        ".reply-container"
      );
    console.log(replyContainer);
    const replySection = document.createElement("div");
    replySection.className = "reply-section";
    replyContainer.appendChild(replySection);

    responseJson.replys.forEach((element) => {
      console.log(element);
      replyViewHTML(element.owner.username, element.text, replySection);
    });
  }
};

const addReply = (id) => {
  console.log(id);
};
const handleSubmitBtn = async (event) => {
  event.preventDefault();
  console.log("리플라이 제출 버튼 클릭");

  const { videoId } = videoContainer.dataset;

  const { commentId } = event.target.parentElement.parentElement.dataset;
  const text = event.target.querySelector("input[name=reply]").value;

  const response = await fetch(
    `/api/videos/${videoId}/comment/${commentId}/reply`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    }
  );
  const responseJson = await response.json();

  if (response.status == 201) {
    console.log("리플라이 제출 성공");
    event.target.querySelector("input[name=reply]").value = "";
    addReply(responseJson.newCommentId);
  }
  return;
};

const handleCancelBtn = (event) => {
  console.log("리플라이 캔슬 클릭");

  const form = event.target.parentElement;
  const replyAddBtn =
    event.target.parentElement.parentElement.querySelector(".reply-add-btn");
  form.remove();

  replyAddBtn.addEventListener("click", handleReplyBtn);
};

const handleReplyBtn = (event) => {
  console.log("리플라이 클릭");
  event.target.removeEventListener("click", handleReplyBtn);
  const form = document.createElement("form");
  form.className = "reply-add";

  const input = document.createElement("input");
  input.name = "reply";
  form.appendChild(input);

  const cancelBtn = document.createElement("button");
  cancelBtn.className = "reply-add__cancel";
  cancelBtn.innerText = "cancel";
  cancelBtn.type = "button";
  form.appendChild(cancelBtn);

  const submitBtn = document.createElement("button");
  submitBtn.className = "reply-add__reply";
  submitBtn.innerText = "reply";
  form.appendChild(submitBtn);

  event.target.parentElement.appendChild(form);

  cancelBtn.addEventListener("click", handleCancelBtn);
  form.addEventListener("submit", handleSubmitBtn);
};

// 핸들러:
const handleLikeBtn = async (event) => {
  // console.log("시작 전 duplicatedExcute");
  // console.log(duplicatedExcute);
  // if (duplicatedExcute == true) {
  //   console.log("중복 실행 요청 거부");
  //   event.preventDefault();
  //   return;
  // }
  // duplicatedExcute = true;
  console.log("좋아요 클릭");
  const { videoId } = videoContainer.dataset;
  const { commentId } =
    event.target.parentElement.parentElement.parentElement.dataset;

  const responseRaw = await fetch(
    `/api/videos/${videoId}/comment/${commentId}/like`,
    {
      method: "post",
    }
  );
  if (responseRaw.status == 303) {
    console.log("비 로그인 오류");
    console.log(responseRaw);
    return (window.location.href = "http://localhost:3000/");
    //  모바일에서는 안될 가능성

    // return responseRaw.redirect("http://localhost:3000/");
    // response.redirected를 하고싶은데 안됨
  }
  const response = await responseRaw.json();

  event.target.parentElement.querySelector(".like-button__count").innerText =
    response.count;
  if (response.user === "add") {
    console.log("성공, 좋아요 변경");

    event.target.classList.remove("fa-regular");
    event.target.classList.add("fa-solid");
  } else if (response.user === "remove") {
    console.log("실패");
    event.target.classList.remove("fa-solid");
    event.target.classList.add("fa-regular");
  }
  return;
};

// 핸들러: 이벤트 리스너handleCommitEdit1 제거(댓글 수정 폼 중복 추가 방지)
const handleCommitEdit2 = async (event) => {
  event.preventDefault();

  const { videoId } = videoContainer.dataset;
  const { commentId } = event.target.parentElement.dataset;
  const text = event.target.querySelector(
    "input[data-comment-edit = input-text]"
  ).value;

  const response = await fetch(
    `/api/videos/${videoId}/comment/${commentId}/edit`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify({ text }),
    }
  );

  if (response.status === 200) {
    const comment = event.target.parentElement.querySelector(
      "span.video-comment__text"
    );

    console.log("comment");
    console.log(comment);
    comment.innerText = text;
    const videoComment =
      event.target.parentElement.querySelector("i.fas.fa-pen");
    event.srcElement.remove();

    videoComment.addEventListener("click", handleCommitEdit1);
  }
};

// 핸들러: 댓글 수정용 html 추가, 이벤트 리스너 handleCommitEdit2 추가
const handleCommitEdit1 = (event) => {
  console.log("edit1");
  console.log(event);

  event.srcElement.removeEventListener("click", handleCommitEdit1);
  const newForm = document.createElement("form");
  newForm.className = "video-comment__input";
  newForm.dataset.commentEdit = "form";
  const newInput = document.createElement("input");
  newInput.type = "text";
  newInput.dataset.commentEdit = "input-text";
  newInput.name = "text";
  newForm.appendChild(newInput);

  const newBtn = document.createElement("button");
  newForm.appendChild(newBtn);

  event.target.parentElement.appendChild(newForm);

  return newForm.addEventListener("submit", handleCommitEdit2);
};

const handleCommitDelete = async (event) => {
  const { videoId } = videoContainer.dataset;
  const { commentId } = event.target.parentElement.dataset;

  // 백엔드 db에서 코멘트 도큐먼트, relationship 도큐먼트에서 id 삭제
  const response = await fetch(
    `/api/videos/${videoId}/comment/${commentId}/delete`,
    {
      method: "delete",
    }
  );

  // fake delete 구현 : html 삭제
  if (response.status === 200) {
    event.target.parentElement.remove();
  }
};

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.commentId = id;

  newComment.className = "video-comment max-height";

  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  newComment.appendChild(icon);

  const span = document.createElement("span");
  span.className = "video-comment__text";
  span.innerText = text;
  newComment.appendChild(span);

  const editicon = document.createElement("i");
  editicon.className = "fas fa-pen";

  newComment.appendChild(editicon);

  const Xicon = document.createElement("i");
  Xicon.className = "fas fa-xmark";
  newComment.appendChild(Xicon);

  const likeDiv = document.createElement("div");
  const likeBtn = document.createElement("span");
  likeBtn.className = "like button";

  const likeIcon = document.createElement("i");
  likeIcon.className = "fa-thumbs-up fa-regular";
  likeBtn.appendChild(likeIcon);

  const likeCount = document.createElement("span");
  likeCount.className = "like-button__count";
  likeCount.innerText = 0;
  likeBtn.appendChild(likeCount);

  const unlikeBtn = document.createElement("span");
  unlikeBtn.className = "unlike button";
  const unlikeIcon = document.createElement("i");

  unlikeIcon.className = "fa-regular fa-thumbs-down";
  unlikeBtn.appendChild(unlikeIcon);
  likeDiv.appendChild(likeBtn);
  likeDiv.appendChild(unlikeBtn);
  newComment.appendChild(likeDiv);

  videoComments.prepend(newComment);
  likeIcon.addEventListener("click", handleLikeBtn);
  const newCommentDeleteBtn = newComment.querySelector(
    ".video__comments i.fas.fa-xmark"
  );
  const newCommentEditBtn = newComment.querySelector(
    ".video__comments i.fas.fa-pen"
  );
  newCommentDeleteBtn.addEventListener("click", handleCommitDelete);
  newCommentEditBtn.addEventListener("click", handleCommitEdit1);
};

const handleSubmit = async (event) => {
  console.log("시작 전 duplicatedExcute");
  console.log(duplicatedExcute);
  if (duplicatedExcute == true) {
    console.log("중복 실행 요청 거부");
    event.preventDefault();
    return;
  }
  duplicatedExcute = true;
  event.preventDefault();
  const textarea = form.querySelector("textarea");

  const { videoId } = videoContainer.dataset;

  const text = textarea.value;
  if (text.trim() === "") {
    duplicatedExcute = false;
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "post",
    headers: {
      // "Content-Type": "text/plain",
      "Content-Type": "application/json",
    },
    // body: text,
    body: JSON.stringify({ text }),
  });

  textarea.value = "";
  // window.location.reload();

  if (response.status === 201) {
    console.log("create fake conment");
    const { newCommentId } = await response.json();
    duplicatedExcute = false;
    console.log("완료 후 duplicatedExcute");
    console.log(duplicatedExcute);
    addComment(text, newCommentId);
    return;
  } else {
    console.log("완료 후 duplicatedExcute");
    duplicatedExcute = false;
    console.log(duplicatedExcute);
    return;
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
  // 댓글 추가
}

// 조건, 댓글이 하나 이상 있을 때
if (videoCommentRow.length != 0) {
  // 이벤트: 댓글 삭제
  const commentDeleteBtns = document.querySelectorAll(
    ".video__comments i.fas.fa-xmark"
  );

  commentDeleteBtns.forEach((element) => {
    element.addEventListener("click", handleCommitDelete);
  });

  // 이벤트: 댓글 수정
  const commentEditBtns = document.querySelectorAll(
    ".video__comments i.fas.fa-pen"
  );

  commentEditBtns.forEach((element) => {
    element.addEventListener("click", handleCommitEdit1);
  });

  //  이벤트: 좋아요 버튼
  const commentLikeBtns = document.querySelectorAll(
    ".video__comments .fa-thumbs-up"
  );
  commentLikeBtns.forEach((element) => {
    element.addEventListener("click", handleLikeBtn);
  });

  // 이벤트 리플라이 추가 버튼
  const commentReplyAddBtns = document.querySelectorAll(
    ".video__comments .reply-add-btn"
  );
  commentReplyAddBtns.forEach((element) => {
    element.addEventListener("click", handleReplyBtn);
  });

  // 이벤트 리플라이 보기 버튼
  const commentReplyViewBtns = document.querySelectorAll(
    ".video__comments .reply-view-btn span"
  );
  commentReplyViewBtns.forEach((element) => {
    element.addEventListener("click", handleReplyViewBtn);
  });
}
