import { server } from "../../global/server";

type bodyType = {
  email: string;
  password: string;
  newPassword: string;
};
export const resetPassword = async (
  body: bodyType
): Promise<{ ok: boolean; err?: string }> => {
  const res = await fetch(server + "/auth/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const payload = await res.json();
  return payload;
};
