import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styles: [
  ]
})
export class EditClientComponent implements OnInit {

    id: string = '';
     client!: Client | null  ;

    // client: Client = {
    //   firstName: '',
    //   lastName: '',
    //   email: '',
    //   phone: '',
    //   balance: 0
    // } 

    disableBalanceOnEdit: boolean = true;

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
      client => this.client = client
      );
  }

  onSubmit( {value, valid}: NgForm){
    
  }

}
