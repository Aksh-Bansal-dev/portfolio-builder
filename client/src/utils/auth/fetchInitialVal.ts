import { server } from "../../global/server";

const ret = {
  username: "",
  email: "",
  password: "",
  website_name: "",
  profile_image: undefined,
  about: "",
  education: [],
  projects: [],
  info: [],
  linkedin_profile: "",
  github_profile: "",
  codeforces_profile: "",
  codechef_profile: "",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchInitialVal = async (): Promise<any> => {
  if (!localStorage.getItem("jid")) return ret;
  const res = await fetch(server + "/user/everything", {
    headers: {
      Authorization: "bearer " + localStorage.getItem("jid"),
    },
  });
  const data = await res.json();
  if (data.done) {
    return data.data;
  }
  return ret;
};
