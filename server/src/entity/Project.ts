import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: "bytea",
    nullable: true,
  })
  display_picture: Buffer;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;
}
