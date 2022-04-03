import { BasicVehicleInformation } from './basic-vehicle-information';

export class AuctionOverview {
  public label: string;
  public basicVehicleInformation: BasicVehicleInformation;
  public currentHighestBidValue: number;
  public remainingTime: string;
  public amIHighestBidder: boolean;
  private seconds: number;

  constructor(data: any) {
    this.label = data.label;
    this.basicVehicleInformation = new BasicVehicleInformation(
      data.associatedVehicle
    );
    this.currentHighestBidValue = data.currentHighestBidValue;
    this.calculateRemainingTime(data.endingTime);
    this.amIHighestBidder = data.amIHighestBidder;
  }

  calculateRemainingTime(endingTime: Date) {
    this.seconds =
      (new Date(endingTime).getTime() - new Date().getTime()) / 1000;
    this.remainingTime = this.formatTime();
    this.tick();
  }

  formatTime() {
    function format(number) {
      return (number < 10 ? '0' : '') + number;
    }
    var sign = this.seconds < 0 ? '-' : '';
    this.seconds = Math.abs(this.seconds);
    return (
      sign +
      format((this.seconds / 3600) | 0) +
      'h:' +
      format(((this.seconds % 3600) / 60) | 0) +
      'm:' +
      format(Math.ceil(this.seconds % 60)) +
      's'
    );
  }

  //Helper funtion to show the automatic timer on the overview page.
  tick() {
    setTimeout(() => {
      this.seconds--;
      this.remainingTime = this.formatTime();
      this.tick();
    }, 1000);
  }
}
