import { Router, Request, Response } from "express";
import { User } from "../entity/User";
import { getRepository } from "typeorm";
import { verify } from "jsonwebtoken";
import { Template } from "../entity/Template";

const router = Router();

// Get all info about the user using token
router.get("/everything", async (req: Request, res: Response) => {
  try {
    const user = getRepository(User);
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      return res.json({ done: false, err: "No token" });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = verify(accessToken, process.env.JWT_SECRET!);

    if (!payload) {
      return res.json({ done: false, err: "Bad token" });
    }

    const myUser = await user.find({
      relations: ["education", "info", "projects"],
      where: { id: payload.userId },
    });

    if (!myUser || myUser.length < 1) {
      return res.json({ done: false, err: "User not found" });
    }

    const {
      username,
      email,
      website_name,
      about,
      profile_image,
      education,
      projects,
      info,
      linkedin_profile,
      github_profile,
      codechef_profile,
      codeforces_profile,
    } = myUser[0];

    const data = {
      username,
      email,
      website_name,
      about,
      profile_image,
      education,
      projects,
      info,
      linkedin_profile,
      github_profile,
      codechef_profile,
      codeforces_profile,
    };

    return res.status(200).json({ done: true, data });
  } catch (err) {
    console.log("my error: " + err);
    return res.json({ done: false, error: err });
  }
});

// Get all info about the user using website_name
router.get("/data/:website", async (req: Request, res: Response) => {
  try {
    const user = getRepository(User);
    const website_name = req.params.website;
    if (!website_name) {
      return res.json({ done: false, err: "No website name found" });
    }

    const myUser = await user.find({
      relations: ["education", "info", "projects"],
      where: { website_name },
    });
    if (!myUser || myUser.length < 1) {
      return res.json({ done: false, err: "User not found" });
    }
    const {
      username,
      email,
      about,
      profile_image,
      education,
      projects,
      info,
      linkedin_profile,
      github_profile,
      codechef_profile,
      codeforces_profile,
    } = myUser[0];

    const data = {
      username,
      email,
      website_name,
      about,
      profile_image,
      education,
      projects,
      info,
      linkedin_profile,
      github_profile,
      codechef_profile,
      codeforces_profile,
    };

    return res.status(200).json({ done: true, data });
  } catch (err) {
    console.log("my error: " + err);
    return res.json({ done: false, error: err });
  }
});

// Link template to user
router.post("/template", async (req: Request, res: Response) => {
  try {
    const user = getRepository(User);
    const templateRepo = getRepository(Template);

    const template_name = req.body.template_name;
    if (!template_name) {
      return res.json({ done: false, err: "No template id found" });
    }

    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      return res.json({ done: false, err: "No token" });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = verify(accessToken, process.env.JWT_SECRET!);

    if (!payload) {
      return res.json({ done: false, err: "Bad token" });
    }

    const myUser = await user.find({
      where: { id: payload.userId },
    });

    if (!myUser || myUser.length < 1) {
      return res.json({ done: false, err: "User not found" });
    }

    if (myUser[0].template) {
      myUser[0].template.users = myUser[0].template.users.filter(
        (e) => e.id != myUser[0].id
      );
      await templateRepo.save(myUser[0].template);
    }

    const myTemplate = await templateRepo.findOne({ template_name });
    if (!myTemplate) {
      return res.json({ done: false, err: "Bad template ID" });
    }
    if (!myTemplate.users) {
      myTemplate.users = [];
    }

    myTemplate.users.push(myUser[0]);

    templateRepo.save(myTemplate);
    return res.status(200).json({ done: true });
  } catch (err) {
    console.log("my error: " + err);
    return res.json({ done: false, error: err });
  }
});

// Get website name
router.get("/website_name", async (req: Request, res: Response) => {
  try {
    const user = getRepository(User);

    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      return res.json({ done: false, err: "No token" });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = verify(accessToken, process.env.JWT_SECRET!);

    if (!payload) {
      return res.json({ done: false, err: "Bad token" });
    }

    const myUser = await user.find({
      where: { id: payload.userId },
    });

    if (!myUser || myUser.length < 1) {
      return res.json({ done: false, err: "User not found" });
    }

    return res
      .status(200)
      .json({ done: true, data: { website_name: myUser[0].website_name } });
  } catch (err) {
    console.log("my error: " + err);
    return res.json({ done: false, error: err });
  }
});

export default router;
