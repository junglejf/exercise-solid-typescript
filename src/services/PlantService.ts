import PlantModel from '../models/PlantModel';
import { INewPlant, IPlant } from '../interfaces';
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
    if (!plant) throw new NotFoundException('Plant not Found!');
    return plant;
  }

  public async removeById(id: string): Promise<void> {
    const plant = await this.model.removeById(id);
    if (!plant) throw new NotFoundException('Plant not Found!');
  }

  public async editPlant(id: string, plant: Omit<IPlant, 'id'>): Promise<IPlant> {
    const plantExists = await this.model.removeById(id);
    if (!plantExists) throw new NotFoundException('Plant not Found!');

    PlantValidate.validateAttibutes(plant);

    const editedPlant = await this.model.editPlant({ id: parseInt(id, 10), ...plant });
    return editedPlant;
  }

  public async savePlant(plant: INewPlant): Promise<IPlant> {
    PlantValidate.validateAttibutes(plant);

    const { needsSun, size } = plant;
    const waterFrequency = needsSun
      ? size * 0.77 + (origin === 'Brazil' ? 8 : 7)
      : (size / 2) * 1.33 + (origin === 'Brazil' ? 8 : 7);

    const newPlant = await this.model.savePlant({ ...plant, waterFrequency });
    return newPlant;
  }

  public async getPlantsThatNeedsSun(): Promise<IPlant[]> {
    const plants = await this.model.getPlantsThatNeedsSun();
    return plants;
  }
}

export default PlantService;
