import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("connected to DB");
db.on("error", (error) => console.log("❌DB Error", error));
db.once("open", handleOpen);
