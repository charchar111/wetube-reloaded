import User from "../models/User";
import fetch from "node-fetch";
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const pageTitle = "Join";
  const { name, email, username, password, password2, location } = req.body;
  console.log(req.body);
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This password confirmation does not match.",
    });
  }

  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This username or email is already taken.",
    });
  }

  try {
    await User.create({ name, email, username, password, location });
    return res.redirect("/login");
  } catch (error) {
    console.log("error: " + error);
    return res.render("serverError"), { pageTitle: "error" };
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
    const userData = await (
      await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          // token?
        },
      })
    ).json();
    console.log(userData);
    return res.end();
  } else {
    return res.redirect("/login");
  }
};
export const remove = (req, res) => res.send("delete user");
export const edit = (req, res) => res.send("edit user");
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = async (req, res) => {
  const pageTitle = "Login";
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exists.",
    });
  }
  const match = await User.comparePassword(password, user.password);
  if (!match) {
    return res.status(400).render("login", {
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

export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("see user");
