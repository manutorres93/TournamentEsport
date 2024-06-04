import { Player } from "src/modules/player/entities/player.entity";
import { Tournament } from "src/modules/tournament/entities/tournament.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'results' })
export class Result {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Tournament, tournament => tournament.id, {eager:true})
    tournament: Tournament;
  
    @ManyToOne(() => Player, player => player.id, {eager:true})
    winner: Player;
  
    @ManyToOne(() => Player, player => player.id, {eager:true})
    loser: Player;
  
    @Column()
    winnerScore: number;
  
    @Column()
    loserScore: number;

    @DeleteDateColumn()
    deletedAt: Date;
}
