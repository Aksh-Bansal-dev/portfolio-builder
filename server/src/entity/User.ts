import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Education } from "./Education";
import { MyInfo } from "./MyInfo";
import { Project } from "./Project";
import { Template } from "./Template";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({
    unique: true,
  })
  website_name: string;

  @Column()
  password: string;

  @ManyToOne(() => Template, (template) => template.users)
  template: Template;

  @Column({
    nullable: true,
    type: "bytea",
  })
  profile_image: Buffer;

  @Column()
  about: string;

  @OneToMany(() => Education, (education) => education.user)
  education: Education[];

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @OneToMany(() => MyInfo, (info) => info.user)
  info: MyInfo[];

  @Column({
    default: "https://linkedin.com",
  })
  linkedin_profile: string;

  @Column({
    default: "https://github.com",
  })
  github_profile: string;

  @Column({
    default: "https://codeforces.com",
  })
  codeforces_profile: string;

  @Column({
    default: "https://codechef.com",
  })
  codechef_profile: string;
}
