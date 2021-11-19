import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from 'src/app/models/client';

import { FlashMessagesService } from "flash-messages-angular";
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styles: [
  ]
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnAdd: boolean = true;
  @ViewChild('clientForm') form: any;

  constructor(
      private flashMessage: FlashMessagesService,
      private clientService: ClientService,
      private router: Router
      ) { }

  ngOnInit(): void {
  }

  onSubmit( {value, valid}: NgForm){

      if (this.disableBalanceOnAdd) {
        value.balance = 0;
      }

      if (!valid) {
        // Show error
        this.flashMessage.show('Please fill out the form correctly', {
          cssClass: 'alert-danger', timeout: 4000
        });
      } else {
        // Add new client 
        this.clientService.newClient(value);
        // Show message
        this.flashMessage.show('New client added', {
          cssClass: 'alert-success', timeout: 4000
        });

        // Redirect to
        this.router.navigate(['/'])
      }
      console.log(value, valid);
      
  }

}
