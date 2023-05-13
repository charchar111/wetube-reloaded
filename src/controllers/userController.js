import User from "../models/User";

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
