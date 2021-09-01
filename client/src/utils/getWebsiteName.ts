import { server } from "../global/server";
import { isLogin } from "./isLogin";

export const getWebsiteName = async (): Promise<{
  done: boolean;
  data?: { website_name: string };
}> => {
  if (!isLogin()) {
    return { done: false };
  }
  const res = await fetch(server + "/user/website_name", {
    headers: {
      Authorization: "bearer " + localStorage.getItem("jid"),
    },
  });
  const data = await res.json();
  return data;
};
