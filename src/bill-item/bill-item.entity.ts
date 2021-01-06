import { BillingEntity } from "src/billing/billing.entity";
import { ProductEntity } from "src/product/product.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity('bill_item')
export class BillItemEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bill_id: number;

    @ManyToOne(type => BillingEntity,billing => billing.billItems)
    @JoinColumn({name:'bill_id'})
    billing: BillingEntity

    @Column()
    product_id: number;

    @ManyToOne(type => ProductEntity,product => product.billItem)
    @JoinColumn({name:'product_id'})
    product: ProductEntity

    @Column()
    qty: number;

    @Column()
    kot: number;

    @Column({type: 'double'})
    rate: number;

    @Column({type: 'double'})
    totalamount: number;

    @CreateDateColumn({nullable: true})
    createddate: Date;

    @UpdateDateColumn({nullable: true})
    updateddate: Date;
}