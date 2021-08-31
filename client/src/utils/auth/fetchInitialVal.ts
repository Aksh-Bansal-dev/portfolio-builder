/* eslint-disable @typescript-eslint/no-explicit-any */
import { server } from "../../global/server";

export const fetchInitialVal = async (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setInitialVal: React.Dispatch<React.SetStateAction<any>>,
  setImgUrl: React.Dispatch<React.SetStateAction<string>>
): Promise<any> => {
  if (!localStorage.getItem("jid")) {
    setLoading(false);
    return { done: false };
  }
  const res = await fetch(server + "/user/everything", {
    headers: {
      Authorization: "bearer " + localStorage.getItem("jid"),
    },
  });
  const data = await res.json();
  if (data.done) {
    setInitialVal(data.data);
    if (data.data.profile_image) setImgUrl(server + data.data.profile_image);
  }
  setLoading(false);
};
