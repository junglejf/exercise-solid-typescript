import PlantModel from '../models/PlantModel';
import { ICreatePlant, IPlant } from '../interfaces';
import { NotFoundException } from './exceptions';
import PlantValidate from './validations/PlantValidate';

class PlantService {
  private model: PlantModel = new PlantModel();

  public async getAll(): Promise<IPlant[]> {
    const plants = await this.model.getAll();
    return plants;
  }

  public async getById(id: string): Promise<IPlant> {
    const plant = await this.model.getById(id);
    if (!plant) throw new NotFoundException('Planta não cadastrada!');
    return plant;
  }

  public async removeById(id: string): Promise<IPlant> {
    const plant = await this.model.removeById(id);
    if (!plant) throw new NotFoundException('Planta não cadastrada!');
    return plant;
  }

  public async editPlant(id: string, plant: ICreatePlant): Promise<IPlant> {
    const plantExists = await this.model.removeById(id);
    if (!plantExists) throw new NotFoundException('Planta não cadastrada!');

    PlantValidate.validateAttibutes(plant);

    const editedPlant = await this.model.editPlant(id, plant);
    return editedPlant;
  }

  public async savePlant(plant: ICreatePlant): Promise<IPlant> {
    PlantValidate.validateAttibutes(plant);

    const newPlant = await this.model.savePlant(plant);
    return newPlant;
  }

  public async getPlantsThatNeedsSun(): Promise<IPlant[]> {
    const plants = await this.model.getPlantsThatNeedsSun();
    return plants;
  }
}

export default PlantService;
