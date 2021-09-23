import { Router, Request, Response } from "express";
import fs from "fs";
import { User } from "../entity/User";
import { getRepository } from "typeorm";

const router = Router();

fs.readdirSync(process.cwd() + "/views/").forEach((file) => {
  const fileName = file.substring(0, file.length - 4);
  router.get(`/template/${fileName}`, (_req: Request, res: Response) => {
    res.render(fileName, {
      username: "Uchiha Madara",
      profile_image: "/images/template_madara.jpg",
      about: `Madara Uchiha (うちはマダラ, Uchiha Madara) was the legendary leader of the Uchiha clan.
        He founded Konohagakure alongside his childhood friend and rival,
        Hashirama Senju, with the intention of beginning an era of peace.
        When the two couldn't agree on how to achieve that peace, they fought for control of the village,
        a conflict which ended in Madara's death.
      `,
      education: [
        {
          title: "Uchiha clan",
          score: "A+",
          degree: "Shinobi",
          graduation_year: "1900",
        },
      ],
      projects: [
        {
          title: "Mangekyou Sharingan",
          description: "Ultimate Sharingan",
          date: "1905",
        },
      ],
      info: [
        {
          title: "Strongest Uchiha",
          description: `
          He was the strongest Uchiha and he also made uchiha
          clan strongest and most feared clan.
          `,
          year: "1910",
          infoType: "achievement",
        },
        {
          title: "Defeated all 5 Kages",
          description: `
          He fought and defeated all 5 kages at the same time
          without any difficulty.
          `,
          year: "2017",
          infoType: "achievement",
        },
        {
          title: "Controlled Kurama(Nine tails)",
          description: `
          He controlled Kurama(Nine tails) which is the strongest
          tailed beast with his sharingan.
          `,
          year: "1915",
          infoType: "achievement",
        },
      ],
      email: "madara@gmail.com",
      linkedin_profile: "https://linkedin.com",
      codeforces_profile: "https://codeforces.com",
      codechef_profile: "https://codechef.com",
      github_profile: "https://github.com",
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
    return res.send("No Template Selected");
  }
});

export default router;
