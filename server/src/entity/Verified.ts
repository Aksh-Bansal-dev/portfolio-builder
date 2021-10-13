import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Verified {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: false,
  })
  status: boolean;

  @Column({
    nullable: false,
  })
  confirmation_url: string;

  @OneToOne(() => User, (user) => user.verified)
  @JoinColumn()
  user: User;
}
