import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
@Entity('game_table')
export class GameTable {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int', nullable: true })
    user_id!: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    game_code!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    amount!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    winner_amount!: string;
    
    @Column({ type: 'varchar', length: 255, nullable: true })
    owner_commision!: string;

    @Column({ type: 'int', nullable: true })
    game_owner_id!: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    p1_name!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    p1_status!: string;

    @Column({ type: 'int', nullable: true })
    p1_id!: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    p2_name!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    p2_status!: string;
    
    @Column({ type: 'int', nullable: true })
    p2_id!: number;

    @Column({ type: 'int', nullable: true })
    game_result_id!: number;

    @Column({ type: 'int', default : 0 }) 
    is_running!: number;   // if 0 then waiting for player if 1 then running

    @Column({ type: 'int', default : 0 })
    is_checked!: number;

    @Column({ type: 'int', default : 1 })
    is_active!: number;

    @CreateDateColumn({ type: 'timestamp', precision: 6, default: () => 'CURRENT_TIMESTAMP(6)' })
    created_on!: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: "p1_id", referencedColumnName: "id" })
    playerOne!: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: "p2_id", referencedColumnName: "id" })
    playerTwo!: User;
}