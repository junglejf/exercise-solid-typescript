import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { IPlant, ICreatePlant } from '../interfaces';

class PlantModel {
  private conn = connection;

  public async getAll(): Promise<IPlant[]> {
    const query = 'SELECT * FROM plants';
    const [rows] = await this.conn.execute(query);
    const plants = rows as IPlant[];
    return plants;
  }

  public async getById(id: string): Promise<IPlant | null> {
    const query = 'SELECT * FROM plants WHERE id = ?';
    const values = [id];
    const [rows] = await this.conn.execute(query, values);

    const plantById = rows as IPlant[];
    if (plantById.length === 0) return null;

    return plantById[0];
  }

  public async removeById(id: string): Promise<IPlant | null> {
    const removedPlant = await this.getById(id);
    if (!removedPlant) return null;

    const query = 'DELETE FROM plants WHERE id = ?';
    const values = [id];
    await connection.execute(query, values);

    return removedPlant;
  }

  public async editPlant(plantId: string, plant: ICreatePlant): Promise<IPlant> {
    const {
      breed, needsSun, origin, size, waterFrequency,
    } = plant;

    const query = 'UPDATE plants SET breed = ?, needsSun = ?, origin = ?, size = ?, waterFrequency = ? WHERE id = ?';
    const values = [breed, needsSun, origin, size, waterFrequency, plantId];
    await this.conn.execute(query, values);

    return { id: parseInt(plantId, 10), ...plant };
  }

  public async savePlant(plant: ICreatePlant) {
    const {
      breed, needsSun, origin, size, waterFrequency,
    } = plant;
    const query = 'INSERT INTO plants (breed, needs_sun, origin, size, waterFrequency) VALUES (?, ?, ?, ?, ?)';
    const values = [breed, needsSun, origin, size, waterFrequency];

    const [rows] = await this.conn.execute<ResultSetHeader>(query, values);

    const newPlant = {
      id: rows.insertId,
      ...plant,
    };
    return newPlant;
  }
}

export default PlantModel;
