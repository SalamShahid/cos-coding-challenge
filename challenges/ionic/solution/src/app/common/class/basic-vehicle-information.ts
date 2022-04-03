import { FuelType } from '../enum/fuel-type';
import { Transmission } from '../enum/transmission';

export class BasicVehicleInformation {
  public ez: string;
  public vehicleImageUrl: string;
  public mileageInKm: number;
  public fuelType: string;
  public transmission: string;

  constructor(data: any) {
    this.ez = data.ez;
    this.vehicleImageUrl = data.vehicleImages ? data.vehicleImages[0].url : '';
    this.mileageInKm = data.mileageInKm;
    this.fuelType = FuelType[data.fuelType];
    this.transmission = Transmission[data.transmission];
  }
}
