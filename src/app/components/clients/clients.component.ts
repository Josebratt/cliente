import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styles: [
  ]
})
export class ClientsComponent implements OnInit {

  clients: Client[] = [];
  totalOwed: number = 0;

  constructor( private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(
      data => {
        this.clients = data;
        this.getTotalOwed();
      }
    );
  }

  getTotalOwed(){
    this.totalOwed = this.clients.reduce((total, client) => {
      return total + parseFloat(client.balance!.toString());
    }, 0);
  }

}
