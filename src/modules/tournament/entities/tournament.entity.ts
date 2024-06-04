import { Player } from "src/modules/player/entities/player.entity";
import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

  @DeleteDateColumn()
  deletedAt: Date;

  /* @OneToMany(() => Player, player => player.tournament)
  players: Player[]; */

  /* @ManyToOne(() => Player, player => player.tournament, {eager:true})
  player: Player; */

  @ManyToMany(() => Player, player => player.tournaments, {eager:true})
  @JoinTable()
  players: Player[];

  @ManyToOne(() => Player, { nullable: true })
  winner: Player;
}
