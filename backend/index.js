import express from "express";
import { PORT, MONGOURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();
app.use(express.json());
//opt1:
app.use(cors());
//opt2:
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Tpye"],
//   })
// );

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("welcome to my app");
});

//routers
app.use("/books", booksRoute);

//connect db
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
