import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
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

    private get token() {
        const {id, username} = this;
        return jwt.sign({
            id,
            username,
        }, process.env.SECRET, {expiresIn: '7d'},
        );
    }
     responseObject() {
         const {id, username, email, token} = this;
         const responseObject = {id, username, email, token};
         responseObject.token = token;
         return responseObject;
     }
}
