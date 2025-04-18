import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  summary: string;

  @Column({ type: 'timestamp' })
  start: Date;

  @Column({ type: 'timestamp' })
  end: Date;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true }) // 👈 Hier fügst du's ein
  by?: string;
  
  @Column({ nullable: true })
  category?: string;

  @Column({ nullable: true })
  source?: string; // z.B. 'stair' oder 'manual'
}
