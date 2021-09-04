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
      ])
      .execute();
  }
};
