import { sign } from "jsonwebtoken";
import { User } from "../entity/User";

export const getAccessToken = (user: User): string => {
  return sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });
};
