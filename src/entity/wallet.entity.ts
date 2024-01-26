import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_wallet')
export class UserWallet {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int', nullable : false })
    user_id!: number;

    @Column({ type: 'varchar', length: 500, nullable: false })
    amount!: string;
    
    @Column({ type: 'int', default : 0,  nullable : false })
    status!: number; // 0: pending, 1: verify, 2: decline

    @CreateDateColumn({ type: 'timestamp', precision: 6, default: () => 'CURRENT_TIMESTAMP(6)' })
    created_on!: Date;
}