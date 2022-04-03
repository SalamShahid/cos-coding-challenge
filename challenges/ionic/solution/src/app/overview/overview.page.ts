import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';

import { ApiRoutingService } from '../common/service/api-routing.service';
import { AuctionOverview } from '../common/class/auction-overview';
import { StorageService } from '../common/service/storage.service';
import { ValidationService } from '../common/service/validation.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public details: AuctionOverview[];
  //For infinite scroll. Should set to 0 on loading.
  //This same value should be given to the variable inside setTimeout function.
  private offset = 0;

  //For infinite scroll. Number of items to be loaded in a single Api call. Can set to any number above 1.
  //This same value should be given to the variable inside setTimeout function.
  private limit = 4;

  private clearTimeOutId: any;

  constructor(
    private router: Router,
    public loading: LoadingController,
    private routing: ApiRoutingService,
    private storage: StorageService,
    private validation: ValidationService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    if (this.validation.isEmptyString(this.storage.get('token'))) {
      this.router.navigate(['/home']);
    } else {
      this.details = [];
      this.getRunningAuctions(false, '');
    }
  }

  getRunningAuctions(isFirstLoad, event) {
    this.presentLoading();

    var filter = '{"offset":' + this.offset + ',"limit":' + this.limit + '}';
    this.routing.runningAuctionsByBuyer(filter, false).subscribe(
      (response) => {
        response.items.forEach((element) => {
          this.details.push(new AuctionOverview(element));
        });
        console.log('Details:', this.details);
        this.loading.dismiss();

        if (!this.validation.isNullOrUndefined(this.clearTimeOutId))
          clearTimeout(this.clearTimeOutId);
        this.clearTimeOutId = setTimeout(() => {
          this.details = [];
          this.offset = 0;
          this.limit = 4;
          this.infiniteScroll.disabled = false;
          this.getRunningAuctions(false, '');
        }, 20000);

        //Infinite scroll settings
        if (isFirstLoad) event.target.complete();
        if (response.total <= this.limit) this.infiniteScroll.disabled = true;
        this.offset = this.offset + this.limit;
        this.limit = this.limit + this.limit;
      },
      (error) => {
        this.loading.dismiss();
      }
    );
  }

  doInfinite(event) {
    this.getRunningAuctions(true, event);
  }

  async presentLoading() {
    const loading = await this.loading.create({
      message: 'Please Wait. Processing...',
    });
    await loading.present();
  }
}
