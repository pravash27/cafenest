import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { ProductDto } from './product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
    ) {}

    async showAll() {
        return await this.productRepository.find({relations:['category','unit']});
    }

    async showEnabled() {
        return await this.productRepository.find({status:1});
    }

    async showOne(id: number) {
        return await this.productRepository.findOne({id:id});
    }

    async create(data: ProductDto){
        const productCategory = await this.productRepository.create(data);
        await this.productRepository.save(productCategory);
        return productCategory;
    }

    async update(id: number, data: ProductDto) {
        await this.productRepository.update({id:id}, data);
        return await this.productRepository.findOne({id:id});
    }

    async destroy(id: number){
        await this.productRepository.delete({id:id});
        return {status: true};
    }
}
