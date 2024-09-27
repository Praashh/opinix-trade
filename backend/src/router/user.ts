import { Router } from "express";
import prisma from "../utils/db";

const router = Router();

router.post("/check-user", async (req, res) => {
  const { phone } = req.body;
  try {
    let user = await prisma.user.findUnique({
      where: {
        phoneNumber: phone,
      },
    });
    if (!user) {
      user = await prisma.user.create({
        data: {
          phoneNumber: phone,
          role: "USER",
        },
      });
    }
    res.json({ userId: user.id, phone: user.phoneNumber });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/test",(req,res)=>{
    res.json({message : "testing"})
})

export default router;
