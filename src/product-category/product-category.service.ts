import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategoryEntity } from './product-category.entity';
import { Repository } from 'typeorm';
import { ProductCategoryDto } from './product-category.dto';

@Injectable()
export class ProductCategoryService {
    constructor(
        @InjectRepository(ProductCategoryEntity) private productCategoryRepository: Repository<ProductCategoryEntity>,
    ) {}

    async showAll() {
        return await this.productCategoryRepository.find();
    }

    async showOne(id: number) {
        return await this.productCategoryRepository.findOne({id:id});
    }

    async create(data: ProductCategoryDto){
        const productCategory = await this.productCategoryRepository.create(data);
        await this.productCategoryRepository.save(productCategory);
        return productCategory;
    }

    async update(id: number, data: ProductCategoryDto) {
        await this.productCategoryRepository.update({id:id}, data);
        return await this.productCategoryRepository.findOne({id:id});
    }

    async destroy(id: number){
        await this.productCategoryRepository.delete({id:id});
        return {status: true};
    }
}
