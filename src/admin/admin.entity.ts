import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('login')
export class AdminEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: '0'})
    userid: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createddate: Date;

    @UpdateDateColumn()
    updateddate: Date;

    comparePassword(attempt: string) {
        return this.password === attempt;
    }
}
