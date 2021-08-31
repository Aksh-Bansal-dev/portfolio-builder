/* eslint-disable @typescript-eslint/no-explicit-any */
import { server } from "../../global/server";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const fetchRegister = async (body: any): Promise<any> => {
  const regUpdate =
    body.password?.length > 0 ? "/auth/register" : "/auth/update";

  const headers =
    body.password?.length > 0
      ? {
          Authorization: "",
        }
      : {
          Authorization: "bearer " + localStorage.getItem("jid"),
        };

  const myBody = new FormData();
  Object.keys(body).forEach((e) => {
    if (Array.isArray(body[e])) {
      myBody.append(e, JSON.stringify(body[e]));
    } else {
      myBody.append(e, body[e]);
    }
  });
  const res = await fetch(server + regUpdate, {
    method: "POST",
    headers,
    body: myBody,
  });

  const data = await res.json();
  return data;
};
