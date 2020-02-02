import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { ProductEntity } from "src/product/product.entity";

@Entity('unit')
export class UnitEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @OneToMany(type => ProductEntity, product => product.unit)
    product: ProductEntity[]

    @Column({type: 'tinyint', default: '1'})
    status: number;

    @Column({nullable: true})
    loginid: number;

    @CreateDateColumn({nullable: true})
    createddate: Date;

    @UpdateDateColumn({nullable: true})
    updateddate: Date;
}
