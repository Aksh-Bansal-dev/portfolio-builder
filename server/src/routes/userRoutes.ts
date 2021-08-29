import { Router, Request, Response } from "express";
import { User } from "../entity/User";
import { getRepository } from "typeorm";
import { verify } from "jsonwebtoken";

const router = Router();

// Get all info about the user except the profile image using token
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

    const myUser = await user.findOne(payload.userId);

    if (!myUser) {
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
    } = myUser;

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

    return res.status(200).json({ done: "true", data });
  } catch (err) {
    console.log("my error: " + err);
    return res.json({ done: false, error: err });
  }
});

// Get all info about the user except the profile image using website_name
router.get("/data/:website", async (req: Request, res: Response) => {
  try {
    const user = getRepository(User);
    const website_name = req.params.website;
    if (!website_name) {
      return res.json({ done: false, err: "No token" });
    }

    const myUser = await user.find({
      relations: ["education", "info", "projects"],
      where: { website_name },
    });
    if (!myUser) {
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

    return res.status(200).json({ done: "true", data });
  } catch (err) {
    console.log("my error: " + err);
    return res.json({ done: false, error: err });
  }
});

export default router;
