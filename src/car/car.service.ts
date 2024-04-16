import { HttpException, Injectable } from '@nestjs/common';
import { CARS } from './car.model';
import { promises } from 'dns';
import { resolve } from 'path';

@Injectable()
export class CarService {
    private cars = CARS;

    public getAllCars() {
        return this.cars
    }

    public postCar(car:any) {
        return this.cars.push((car))
    }

    public getCarsById(id: number): Promise<any> {
        const carId = Number(id);
        return new Promise((resolve) => {
            const car = this.cars.find((car) => car.id === carId)
            if (!car) {
                throw new HttpException('Car does not exist', 404)
            }
            return resolve(car);
        });

    }

    public deleteCarById(id: number): Promise<any> {
        const carId = Number(id);
        return new Promise((resolve) => {
            const index = this.cars.findIndex((car) => car.id === carId)
            if (index === -1) {
                throw new HttpException('Not Found', 404)
            }
            this.cars.splice(index, 1)
            return resolve(this.cars);
        })
    }


    public putCarById(id: number, propertyName: string, propertyValue: string): Promise<any>  {
        const carId = Number(id);
        return new Promise((resolve) => {
        const index = this.cars.findIndex((car) => car.id === carId)
        if (index === -1) {
            throw new HttpException('Not Found', 404)
        }
        this.cars[index][propertyName] = propertyValue;
        return resolve(this.cars[index]);
        });
    }
}
