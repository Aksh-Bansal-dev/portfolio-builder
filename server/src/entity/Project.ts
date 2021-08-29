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
    nullable: true,
  })
  display_picture: string;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;
}
