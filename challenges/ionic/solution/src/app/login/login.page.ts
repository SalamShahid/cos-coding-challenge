import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { ApiRoutingService } from '../common/service/api-routing.service';
import { StorageService } from '../common/service/storage.service';
import { ValidationService } from '../common/service/validation.service';
import { MessageService } from '../common/service/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: string;
  public password: string;
  public ionicForm: FormGroup;
  isSubmitted = false;

  constructor(
    public formBuilder: FormBuilder,
    private routing: ApiRoutingService,
    private router: Router,
    public loading: LoadingController,
    private message: MessageService,
    private storage: StorageService,
    private validation: ValidationService
  ) {}

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'
          ),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  ionViewWillEnter() {
    this.storage.clear();
    this.email = '';
    this.password = '';
  }

  submit() {
    this.isSubmitted = true;
    if (this.ionicForm.valid) {
      this.presentLoading();
      this.routing.authenticateBuyer(this.email, this.password).subscribe(
        (data) => {
          console.log('authenticateBuyer: ', data);

          //Check for authorization.
          if (data.privileges.includes('SALESMAN_USER')) {
            if (!this.validation.isEmptyString(data.userId)) {
              this.storage.set('userId', data.userId);
              this.loading.dismiss().then(() => {
                this.router.navigate(['/overview']);
              });
            }
          } else {
            this.loading.dismiss().then(() => {
              this.message.showMessage('Kein autorisierter Benutzer');
            });
          }
        },
        (error) => {
          this.loading.dismiss();
        }
      );
    } else {
      console.log('Form validation failed');
      return false;
    }
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  async presentLoading() {
    const loading = await this.loading.create({
      message: 'Please Wait. Processing...',
    });
    await loading.present();
  }
}
