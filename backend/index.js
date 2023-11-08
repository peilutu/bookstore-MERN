import express from "express";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
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
const PORT = process.env.PORT || 5556;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
