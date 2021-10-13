import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Education } from "./Education";
import { MyInfo } from "./MyInfo";
import { Project } from "./Project";
import { Template } from "./Template";
import { Verified } from "./Verified";

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
  })
  profile_image: string;

  @Column()
  about: string;

  @OneToMany(() => Education, (education) => education.user, { cascade: true })
  education: Education[];

  @OneToMany(() => Project, (project) => project.user, { cascade: true })
  projects: Project[];

  @OneToMany(() => MyInfo, (info) => info.user, { cascade: true })
  info: MyInfo[];

  @OneToOne(() => Verified, (verified) => verified.user, { cascade: true })
  verified: Verified;

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
