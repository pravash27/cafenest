import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('login')
export class AdminEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    firebaseid: string;

    @CreateDateColumn()
    createddate: Date;

    @UpdateDateColumn()
    updateddate: Date;
}
