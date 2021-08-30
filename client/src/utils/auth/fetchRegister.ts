import { server } from "../../global/server";
import { fetchLogin } from "./fetchLogin";

interface bodyTypes {
  email: string;
  username: string;
  password: string;
}
export const fetchRegister = async (
  body: bodyTypes
): Promise<{ done: boolean }> => {
  const regUpdate =
    body.password?.length > 0 ? "/auth/register" : "/auth/update";
  const res = await fetch(server + regUpdate, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (data.done) {
    await fetchLogin(body);
    return data;
  } else {
    return data;
  }
};
