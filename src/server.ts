// *************** Imports ***************
import express, { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import cors from "cors";
import WilderController from "./controllers/WilderController";

// *************** Variables ***************
const app = express();
const uri = "mongodb://127.0.0.1:27017/wilderdb";
const port = 5000;
const versionApi = "/api/wilder";

// *************** MongoError ***************
interface MongoError extends Error {
  code: number;
}
function isMongoError(error: Error): error is MongoError {
  return error.name === "MongoError";
}
// *************** Database ***************
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  })
  // eslint-disable-next-line no-console
  .then(() => console.log("Connected to database"))
  // eslint-disable-next-line no-console
  .catch((err) => console.log(err));

// *************** Middleware ***************
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// *************** Routes ***************
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.post(versionApi, asyncHandler(WilderController.create));
app.get(versionApi, asyncHandler(WilderController.read));
app.put(versionApi, asyncHandler(WilderController.update));
app.delete(`${versionApi}/:_id`, asyncHandler(WilderController.delete));

app.get("*", (req: Request, res: Response) => {
  res.status(404);
  res.send({ success: false, message: "Wrong address" });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
  if (isMongoError(error)) {
    if (error.code === 11000) {
      res.status(400);
      res.json({ success: false, message: "The name is already used" });
    } else {
      res.status(400);
      res.json({ success: false, message: "Database error" });
    }
  }
});

// *************** Start server ***************
app.listen(port, () => console.log(`Server started on ${port}`));
