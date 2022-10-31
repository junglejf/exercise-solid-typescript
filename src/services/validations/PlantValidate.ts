import { INewPlant } from '../../interfaces';
import { BadRequestException } from '../exceptions';

export default class PlantValidate {
  static validateBreed(breed: string): void {
    if (typeof breed !== 'string') {
      throw new BadRequestException('Attribute "breed" must be string.');
    }
  }

  static validateNeedsSun(needsSun: boolean): void {
    if (typeof needsSun !== 'boolean') {
      throw new BadRequestException('Attribute "needSun" must be boolen.');
    }
  }

  static validateOrigin(origin: string): void {
    if (typeof origin !== 'string') {
      throw new BadRequestException('Attribute "origin" must be string.');
    }
  }

  static validateSize(size: number): void {
    if (typeof size !== 'number') {
      throw new BadRequestException('Attribute "size" must be number.');
    }
  }

  static validateAttibutes(plant: INewPlant): void {
    PlantValidate.validateBreed(plant.breed);
    PlantValidate.validateNeedsSun(plant.needsSun);
    PlantValidate.validateOrigin(plant.origin);
    PlantValidate.validateSize(plant.size);
  }
}
