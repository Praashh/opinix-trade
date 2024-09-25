import express from "express"
import userRouter from "./user";
import adminRouter from "./admin"

const router = express.Router();

router.use("/user", userRouter);
router.use('/admin', adminRouter)
export default router;