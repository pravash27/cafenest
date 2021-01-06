import { BillingEntity } from "src/billing/billing.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity('table')
export class TableEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => BillingEntity, billing => billing.table)
    billing: BillingEntity[]
    @Column({unique: true})
    name: string;

    @Column({type: 'tinyint', default: '1'})
    status: number;

    @Column({nullable: true})
    loginid: number;

    @CreateDateColumn({nullable: true})
    createddate: Date;

    @UpdateDateColumn({nullable: true})
    updateddate: Date;
}