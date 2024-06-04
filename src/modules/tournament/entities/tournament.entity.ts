import { Player } from "src/modules/player/entities/player.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tournaments' })
export class Tournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @OneToMany(() => Player, player => player.tournament)
  players: Player[];

  @ManyToOne(() => Player, { nullable: true })
  winner: Player;
}
