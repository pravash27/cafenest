import { Injectable, HttpException } from '@nestjs/common';
import { UnitEntity } from './unit.entity';
import { UnitDto } from './unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UnitService {
    constructor(
        @InjectRepository(UnitEntity) private unitRepository: Repository<UnitEntity>,
    ) {}

    async showAll() {
        return await this.unitRepository.find();
    }

    async showEnabled() {
        return await this.unitRepository.find({status: 1});
    }

    async showOne(id: number) {
        return await this.unitRepository.findOne({id:id});
    }

    async create(data: UnitDto){
        try{
            const unit = await this.unitRepository.create(data);
            await this.unitRepository.save(unit);
            return unit;
        }catch(e){
            const error = {
                "code": e.code,
                "errno": e.errno,
                "name": e.name,
            }
            throw new HttpException(error, 404);
        }
    }

    async update(id: number, data: UnitDto) {
        try{
            await this.unitRepository.update({id:id}, data);
            return await this.unitRepository.findOne({id:id});
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
        await this.unitRepository.delete({id:id});
        return {status: true};
    }
}
