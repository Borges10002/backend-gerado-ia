import "reflect-metadata";
import express from "express";
import cors from "cors";
import databaseService from "./services/database-service.js";
import userRouter from "./routes/user.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

databaseService
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const port = 3000;

app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export { app };
