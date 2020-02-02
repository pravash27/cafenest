import { Injectable, HttpException } from '@nestjs/common';
import { TableEntity } from './table.entity';
import { TableDto } from './table.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TableService {
    constructor(
        @InjectRepository(TableEntity) private tableRepository: Repository<TableEntity>,
    ) {}

    async showAll() {
        return await this.tableRepository.find();
    }

    async showEnabled() {
        return await this.tableRepository.find({status: 1});
    }

    async showOne(id: number) {
        return await this.tableRepository.findOne({id:id});
    }

    async create(data: TableDto){
        try{
            const table = await this.tableRepository.create(data);
            await this.tableRepository.save(table);
            return table;
        }catch(e){
            const error = {
                "code": e.code,
                "errno": e.errno,
                "name": e.name,
            }
            throw new HttpException(error, 404);
        }
    }

    async update(id: number, data: TableDto) {
        try{
            await this.tableRepository.update({id:id}, data);
            return await this.tableRepository.findOne({id:id});
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
        await this.tableRepository.delete({id:id});
        return {status: true};
    }
}
