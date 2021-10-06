import { server } from "../../global/server";

type bodyType = {
  email: string;
  website_name: string;
  newPassword: string;
};
export const forgotPassword = async (
  body: bodyType
): Promise<{ done: boolean; err?: string }> => {
  const res = await fetch(server + "/auth/forgot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const payload = await res.json();
  return payload;
};
