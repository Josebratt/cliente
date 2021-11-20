import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styles: [
  ]
})
export class ClientDetailsComponent implements OnInit {
  id!: string;
  client!: Client | null;
  hasBalance : boolean = true;
  showBalanceUpdateInput: boolean = false;

  constructor( 
      private clientService: ClientService,
      private flashMessage: FlashMessagesService,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // get id fron url
    this.id = this.route.snapshot.params['id'];
    // get client
    this.clientService.getClient(this.id).subscribe(
      client => {
        if (client != null) {
            if (client.balance! > 0) {
                this.hasBalance = true;
            }
        }
        this.client = client;
        console.log(client);
      });
  }

  updateBalance(){
      this.clientService.updateClient(this.client!);
      this.flashMessage.show('Balance Update', {
        cssClass: 'alert-success', timeout: 4000
      });
  }

  onDeleteClick(){
    
  }

}
