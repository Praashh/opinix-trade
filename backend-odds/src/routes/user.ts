import express, { Router } from "express";
import { newOrder } from "../controllers/user";
const router:Router = express.Router();


router.post("/new-order", newOrder);

export default router;