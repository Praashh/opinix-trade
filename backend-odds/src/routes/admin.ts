import express, { Router } from "express";
import { newOrder } from "../controllers/user";
const router:Router = express.Router();


router.post("/create-event", newOrder);

export default router;