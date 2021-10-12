import { Template } from "../entity/Template";
import { getConnection } from "typeorm";

export const initialTemplateData = async (): Promise<void> => {
  const data = await getConnection()
    .createQueryBuilder()
    .select("template")
    .from(Template, "template")
    .getMany();
  if (data.length === 0) {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Template)
      .values([
        {
          creator: "Aksh",
          template_name: "template1",
          display_picture: "/images/template1.png",
        },
        {
          creator: "Himanshu",
          template_name: "template2",
          display_picture: "/images/template2.png",
        },
        {
          creator: "Himanshu",
          template_name: "template3",
          display_picture: "/images/template3.png",
        },
        {
          creator: "Jatin",
          template_name: "template4",
          display_picture: "/images/template4.png",
        },
      ])
      .execute();
  }
};
