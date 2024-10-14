import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import orderRouter from "./router/order";
import eventRouter from "./router/event";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/v1/order", orderRouter);
app.use("/v1/events", eventRouter);

app.listen(3001, () => {
  console.log(`Server is running on http://localhost:3001`);
});
