import { server } from "../global/server";

export const fetchTemplates = async (): Promise<{
  done: boolean;
  data: [
    {
      id: number;
      display_picture: string;
      creator: string;
      template_name: string;
    }
  ];
}> => {
  const res = await fetch(server + "/template/all");
  const data = await res.json();
  return data;
};
