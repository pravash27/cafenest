import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { ProductCategoryEntity } from "src/product-category/product-category.entity";
import { UnitEntity } from "src/unit/unit.entity";
import { BillItemEntity } from "src/bill-item/bill-item.entity";

@Entity('product')
export class ProductEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type=>BillItemEntity,billItem => billItem.product)
    billItem: BillItemEntity[]
    
    @Column()
    category_id: number;

    @ManyToOne(type => ProductCategoryEntity, category => category.product)
    @JoinColumn({name: 'category_id'})
    category: ProductCategoryEntity;

    @Column({nullable: true})
    unit_id: number;

    @ManyToOne(type => UnitEntity, unit => unit.product)
    @JoinColumn({name: 'unit_id'})
    unit: UnitEntity;

    @Column()
    name: string;

    @Column({type: 'double'})
    rate: number;

    @Column()
    discount: number;

    @Column({type: 'tinyint', default: '1'})
    status: number;

    @Column({nullable: true})
    loginid: number;

    @CreateDateColumn({nullable: true})
    createddate: Date;

    @UpdateDateColumn({nullable: true})
    updateddate: Date;
}