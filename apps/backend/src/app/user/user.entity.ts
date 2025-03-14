import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) 
  githubId: string; // GitHub-ID als eindeutige Spalte

  @Column({ nullable: true }) 
  username: string;

  @Column({ nullable: false }) 
  name: string;
}
