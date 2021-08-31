import { Router, Request, Response } from "express";
import fs from "fs";
import { User } from "../entity/User";
import { getRepository } from "typeorm";

const router = Router();

fs.readdirSync(process.cwd() + "/views/").forEach((file) => {
  const fileName = file.substring(0, file.length - 4);
  router.get(`/template/${fileName}`, (_req: Request, res: Response) => {
    res.render("template_" + fileName, {
      tagline: "douchy tagline",
    });
  });
});

router.get("/:website", async (req: Request, res: Response) => {
  try {
    const userRepo = getRepository(User);
    const website_name = req.params.website;
    const myUser = await userRepo.find({
      relations: ["education", "info", "projects", "template"],
      where: { website_name },
    });
    if (!myUser || myUser.length < 1) {
      return res.status(404).json({ done: false, err: "webpage not found" });
    }
    return res.render(myUser[0].template.template_name, {
      ...myUser[0],
    });
  } catch (err) {
    return res.json({ done: false, err: "Something went wrong" });
  }
});

export default router;
