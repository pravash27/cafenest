import { Injectable, HttpException } from '@nestjs/common';
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
    
    async showEnabled(){
        return await this.productCategoryRepository.find({status:1});
    }

    async showOne(id: number) {
        return await this.productCategoryRepository.findOne({id:id});
    }

    async create(data: ProductCategoryDto) {
        try {
            const productCategory = await this.productCategoryRepository.create(data);
            await this.productCategoryRepository.save(productCategory);
            return productCategory;
        } catch(e){
            const error = {
                "code": e.code,
                "errno": e.errno,
                "name": e.name,
            }
            throw new HttpException(error, 404);
        }

    }

    async update(id: number, data: ProductCategoryDto) {
        try{
            await this.productCategoryRepository.update({id:id}, data);
            return await this.productCategoryRepository.findOne({id:id});
        }catch(e){
            const error = {
                "code": e.code,
                "errno": e.errno,
                "name": e.name,
            }
            throw new HttpException(error, 404);
        }
        
    }

    async destroy(id: number){
        await this.productCategoryRepository.delete({id:id});
        return {status: true};
    }
}
