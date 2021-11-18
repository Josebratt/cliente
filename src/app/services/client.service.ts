import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientsColletion!: AngularFirestoreCollection<Client> ;
  clientDoc: AngularFirestoreDocument<Client> | undefined;
  clients!: Observable<Client[]>;
  client!: Observable<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientsColletion = this.afs.collection('clients',
      ref => ref.orderBy('lastName', 'asc'));
   }

   getClients(): Observable<Client[]>{
     // Get clients with the id
     this.clients = this.clientsColletion?.snapshotChanges().pipe(
                        map(actions => actions.map(resp => {
                            const data = resp.payload.doc.data() as Client;
                            data.id = resp.payload.doc.id;
                            return data;
                        }))
     );

     return this.clients;

   }
}
