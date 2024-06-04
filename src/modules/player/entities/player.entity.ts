import { Tournament } from "src/modules/tournament/entities/tournament.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'players' })
export class Player {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    email: string;
  
    @ManyToOne(() => Tournament, tournament => tournament.players, {eager:true})
    tournament: Tournament;
}
