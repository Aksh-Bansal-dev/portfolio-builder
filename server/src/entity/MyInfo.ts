import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

export type InfoType = "achievement" | "contribution" | "experience";

@Entity()
export class MyInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.info)
  user: User;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  year: string;

  @Column({
    type: "enum",
    enum: ["achievement", "contribution", "experience"],
    default: "achievement",
  })
  infoType: InfoType;
}
