import User from "../models/User";
import Video from "../models/Video";
import fetch from "node-fetch";
import bcrypt from "bcrypt";
export const getJoin = (req, res) => {
  res.render("user/join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const pageTitle = "Join";
  const { name, email, username, password, password2, location } = req.body;
  console.log(req.body);
  if (password !== password2) {
    return res.status(400).render("user/join", {
      pageTitle,
      errorMessage: "This password confirmation does not match.",
    });
  }

  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("user/join", {
      pageTitle,
      errorMessage: "This username or email is already taken.",
    });
  }

  try {
    await User.create({
      name,
      email,

      username,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    console.log("error: " + error);
    return res.status(400).render("serverError"), { pageTitle: "error" };
  }
};
export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    scope: "user:email read:user",
    allow_signup: false,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  //헤더는 리스폰스값을 json으로 받기 위한 설정값. 문서에 헤더설명은x 강의 참조//

  //위 아래 동일, //
  // const data = await fetch(finalUrl, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //   },
  // });
  // //헤더는 리스폰스값을 json으로 받기 위한 설정값. 문서에 헤더설명은x 강의 참조//

  // const json = await data.json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          // token?
        },
      })
    ).json();
    console.log(userData);
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();
    console.log("email");
    const emailObj = emailData.find(
      (element) => element.primary === true && element.verified === true
    );
    // console.log(emailData);
    console.log(emailObj);
    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      console.log("need to create account");
      //create an account
      // 깃헙 아이디 만으로 비밀번호 생성 없이 계정 만들기
      user = await User.create({
        avatarUrl: userData.avatar_url,
        name: userData.name ? userData.name : "Unknown",
        email: emailObj.email,
        username: userData.login,
        password: "",
        socialOnly: true,
        location: userData.location ? userData.location : "Unknown",
      });

      req.session.loggedIn = true;
      req.session.user = user;
      return res.redirect("/");
    }

    req.session.loggedIn = true;
    req.session.user = user;

    return res.redirect("/login");
  } else {
    return res.redirect("/login");
  }
};
export const startKakaoLogin = (req, res) => {
  const restApiKey = "edf57a93edb6b19376f5a9529b2ba0db";
  const redirectUrl = "http://localhost:3000/users/kakaotalk/process-one";
  return res.redirect(
    `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUrl}&response_type=code`
  );
};

export const processOneKakaoLogin = (req, res) => {
  // console.log(req.query);
  if (req.query.error) {
    console.log(req.query.error);
    console.log(req.query.error_description);
    return res.redirect("/");
  }
  console.log("정상 승인");
  const { code } = req.query;

  return res.redirect("/");
};
export const remove = (req, res) => res.send("delete user");
export const getEdit = async (req, res) => {
  return res.render("user/editProfile", { pageTitle: "edit-profile" });
};
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, email: sessionEmail, username: sessionUsername, avatarUrl },
    },
    body: { name, username, location, email },
    file,
  } = req;

  console.log(req.file);
  // console.log(path);

  let searchParam = [];
  if (sessionEmail !== email) {
    searchParam.push({ email });
  }
  if (sessionUsername !== username) {
    searchParam.push({ username });
  }
  if (searchParam.length > 0) {
    const foundUser = await User.findOne({ $or: searchParam });
    if (foundUser && foundUser._id.toString() !== _id) {
      return res.status(400).render("editProfile", {
        pageTitle: "edit-profile",
        errorMessage: "This username or email is already taken.",
      });
    }
  }
  // 타 유저 계정과의 username, email 중복 점검 + 타 유저 계정인지 확인

  await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? `/${file.path}` : avatarUrl,
      name,
      username,
      location,
      email,
    },
    { new: true }
  );

  req.session.user = {
    ...req.session.user,
    name,
    username,
    email,
    location,
    avatarUrl: file ? `/${file.path}` : avatarUrl,
  };
  console.log("업데이트 완료 후, 컨트롤러에서의 세션 유저");
  console.log(req.session.user);

  return res.redirect("/users/edit-profile");
};

export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    console.log("sns 유저는 비밀번호 변경 불가");
    req.flash("info", "sns user can't change password");
    return res.redirect("/");
  }
  return res.render("user/change-password", { pageTitle: "change Password" });
};
export const postChangePassword = async (req, res) => {
  // send notification

  const {
    session: {
      user: { _id, password },
    },
    body: { oldPassword, newPassword, newPasswordConfirmation },
  } = req;
  const ok = await bcrypt.compare(oldPassword, password);
  console.log(ok);
  if (!ok) {
    const errorMessage = "The current password is incorrect";
    return res.status(400).render("user/change-password", {
      pageTitle: "change Password",
      errorMessage,
    });
  }
  if (newPassword !== newPasswordConfirmation) {
    const errorMessage = "the new password does not match confirmation. ";
    return res.status(400).render("user/change-password", {
      pageTitle: "change Password",
      errorMessage,
    });
  }

  // req.session.user = await User.findByIdAndUpdate(
  //   _id,
  //   { password: newPassword },
  //   { new: true }
  // );
  const user = await User.findById(_id);
  user.password = newPassword;

  await user.save();
  req.flash("info", "Password updated");
  req.session.user.password = user.password;
  return res.redirect("/users/logout");
};

export const getLogin = (req, res) =>
  res.render("user/login", { pageTitle: "Login" });
export const postLogin = async (req, res) => {
  const pageTitle = "Login";
  const { username, password } = req.body;
  const user = await User.findOne({ username, socialOnly: false });

  if (!user) {
    return res.status(400).render("user/login", {
      pageTitle,
      errorMessage: "An account with this username does not exists.",
    });
  }
  const match = await User.comparePassword(password, user.password);
  if (!match) {
    return res.status(400).render("user/login", {
      pageTitle,
      errorMessage: "this password does not match with account's password.",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;

  return res.redirect("/");
  // check if accont exist
  // check if password exist
};

export const logout = (req, res) => {
  console.log("로그아웃");

  req.session.user = null;
  req.session.loggedIn = false;
  req.flash("info", "Bye Bye");

  return res.redirect("/");
};
export const see = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate({
      path: "videos",
      populate: { path: "owner", model: "User" },
    });

    if (!user) {
      return res.status(404).render("serverError"), { pageTitle: "error" };
    }

    return res.render("user/profile", {
      pageTitle: `${user.username}`,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).render("serverError"), { pageTitle: "error" };
  }
};
