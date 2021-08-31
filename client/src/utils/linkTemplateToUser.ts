import { server } from "../global/server";

export const linkTemplateToUser = async (
  template_name: string
): Promise<{ done: boolean }> => {
  const res = await fetch(server + "/user/template", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "bearer " + localStorage.getItem("jid"),
    },
    body: JSON.stringify({ template_name }),
  });

  const data = await res.json();
  return data;
};
