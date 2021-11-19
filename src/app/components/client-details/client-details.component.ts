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
  id: string = '';
  client: Client[] = [];
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
    this.clientService.getClient(this.id)
  }

}
