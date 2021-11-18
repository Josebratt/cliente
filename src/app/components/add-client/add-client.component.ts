import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from 'src/app/models/client';

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

  disableBlanceOnAdd: boolean = true;
  @ViewChild('clientForm') form: any;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit( {value, valid}: NgForm){
      console.log(value, valid);
      
  }

}
