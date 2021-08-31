import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Template } from "../entity/Template";

const router = Router();

// Get all templates
router.get("/all", async (_req: Request, res: Response) => {
  try {
    const templateRepo = getRepository(Template);
    const data = await templateRepo.find();
    return res.json({ done: true, data });
  } catch (err) {
    console.log("my error: " + err);
    return res.json({ done: false, error: err });
  }
});

export default router;
