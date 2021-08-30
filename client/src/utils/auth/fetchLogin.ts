import { server } from "../../global/server";

interface bodyTypes {
  email: string;
  username?: string;
  password: string;
}
export const fetchLogin = async (
  body: bodyTypes
): Promise<{ done: boolean }> => {
  const res = await fetch(server + "/auth/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (data.done) {
    return data;
  } else {
    return data;
  }
};
