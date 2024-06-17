import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Prize {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  quantity: number;
}