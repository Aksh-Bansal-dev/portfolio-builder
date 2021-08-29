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
    nullable: true,
  })
  display_picture: string;

  @OneToMany(() => User, (user) => user.template, { cascade: true })
  users: User[];
}
