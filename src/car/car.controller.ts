import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CarService } from './car.service';
import { CarDto } from './car.dto';

@Controller('car')
export class CarController {

    constructor(private carService: CarService) { }

    @Get()
    public async getallcars() {
        return this.carService.getAllCars();
    }

    @Post()
    public async postCars(@Body() car: CarDto) {
        return this.carService.postCar(car)
    }

    @Get(':id')
    public async getCarById(@Param('id') id: number) {
        return this.carService.getCarsById(id);
    }

    @Delete(':id')
    public async deleteCarById(@Param('id') id: number) {

       return this.carService.deleteCarById(id);
    }

    @Put(':id')
    public async putCarById(@Param('id') id: number, @Query() Query) {
        const propertyName = Query.property_name;
        const propertyValue = Query.property_value;

        return this.carService.putCarById(id, propertyName, propertyValue)
    }

}
