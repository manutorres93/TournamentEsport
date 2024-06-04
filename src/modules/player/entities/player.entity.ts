import { IsOptional } from "class-validator";
import { Tournament } from "src/modules/tournament/entities/tournament.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'players' })
export class Player {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    email: string;
  
    /* @ManyToOne(() => Tournament, tournament => tournament.players, {eager:true})
    tournament: Tournament; */

    /* @OneToMany(() => Tournament, tournament => tournament.player)
    tournament: Tournament */

    @ManyToMany(() => Tournament, tournament => tournament.players)
    @JoinTable()
    
    tournaments: Tournament[];
}
