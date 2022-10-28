export interface IPlant {
  id: number,
  breed: string,
  needsSun: boolean,
  origin: string,
  size: number,
  waterFrequency?: number,
}

export type ICreatePlant = Omit<IPlant, 'id'>;
