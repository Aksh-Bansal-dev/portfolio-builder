import { server } from "../global/server";
import { logout } from "./logout";

export const isLogin = async (): Promise<boolean> => {
  if (localStorage.getItem("jid")) {
    const res = await fetch(`${server}/auth/check`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("jid"),
      },
    });

    const data = await res.json();
    if (data.done) {
      return true;
    } else {
      logout();
      return false;
    }
  }
  {
    return false;
  }
};
