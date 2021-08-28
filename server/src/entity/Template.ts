import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./User";

@Entity()
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  creator: string;

  @Column({
    unique: true,
  })
  template_name: string;

  @Column({
    type: "bytea",
  })
  display_picture: Buffer;

  @OneToMany(() => User, (user) => user.template)
  users: User[];
}
