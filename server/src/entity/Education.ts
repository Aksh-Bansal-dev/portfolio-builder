import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Education {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.education)
  user: User;

  @Column()
  degree: string;

  @Column()
  title: string;

  @Column()
  score: string;

  @Column()
  graduation_year: string;
}
