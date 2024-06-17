import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Player } from '../../player/entities/player.entity';
import { Prize } from '../../prize/entities/prize.entity';

@Entity()
export class AssignedPrize {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Player, { eager: true })
    player: Player;
  
    //@ManyToOne(() => Prize, { eager: true })
    @Column()
    //prize: Prize;
    prize: string

    @Column()
    prizeQuantity: number;
  
    @CreateDateColumn()
    assignedAt: Date;
}
