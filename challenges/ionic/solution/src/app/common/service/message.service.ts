import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private toastController: ToastController) {}

  //A toast message will be shown on top side of the page
  async showMessage(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 8000,
      position: 'top',
    });
    toast.present();
  }
}
