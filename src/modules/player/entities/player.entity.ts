import { IsOptional } from "class-validator";
import { Result } from "src/modules/result/entities/result.entity";
import { Tournament } from "src/modules/tournament/entities/tournament.entity";
import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'players' })
export class Player {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    email: string;

    @DeleteDateColumn()
    deletedAt: Date;
  

    @ManyToMany(() => Tournament, tournament => tournament.players)
    //@JoinTable()  //tal vez funciona sin esto 
    tournaments: Tournament[];


    @OneToMany(()=> Result, (result)=> result.winner)
    resultWinner: Result[]

    @OneToMany(()=> Result, (result)=> result.loser)
    resultLoser: Result[]
}
