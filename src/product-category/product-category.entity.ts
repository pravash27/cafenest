import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('productCategory')
export class ProductCategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({type: 'tinyint', default: '1'})
    status: number;

    @CreateDateColumn({nullable: true})
    createddate: Date;

    @UpdateDateColumn({nullable: true})
    updateddate: Date;
}
