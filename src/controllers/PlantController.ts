import { Request, Response, NextFunction } from 'express';
import PlantService from '../services/PlantService';

class PlantController {
  public service: PlantService = new PlantService();

  public async getAll(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const plants = await this.service.getAll();
      return res.status(200).json(plants);
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const plant = await this.service.getById(id);
      return res.status(200).json(plant);
    } catch (error) {
      next(error);
    }
  }

  public async remove(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const plant = await this.service.removeById(id);
      return res.status(204).json(plant);
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const plant = await this.service.editPlant(id, req.body);
      return res.status(200).json(plant);
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const plant = await this.service.savePlant(req.body);
      return res.status(201).json(plant);
    } catch (error) {
      next(error);
    }
  }

  public async getPlantsThatNeedsSun(_req: Request, res: Response, next: NextFunction) {
    try {
      const plant = await this.service.getPlantsThatNeedsSun();
      return res.status(201).json(plant);
    } catch (error) {
      next(error);
    }
  }
}

export default PlantController;
