import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientsColletion: AngularFirestoreCollection<Client>;
  clientDoc!: AngularFirestoreDocument<Client>;
  clients!: Observable<Client[]>;
  client!: Observable<Client | null>;

  constructor(private afs: AngularFirestore) {
    this.clientsColletion = this.afs.collection('clients',
      ref => ref.orderBy('lastName', 'asc'));
   }

   getClients(): Observable<Client[]>{
     // Get clients with the id
     this.clients = this.clientsColletion.snapshotChanges().pipe(
                        map(actions => actions.map(resp => {
                            const data = resp.payload.doc.data() as Client;
                            data.id = resp.payload.doc.id;
                            return data;
                        }))
     );

     return this.clients;

   }

   newClient(client: Client){
      this.clientsColletion.add(client);
   }

   getClient(id: string): Observable<Client | null>{
      this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
      this.client = this.clientDoc.snapshotChanges().pipe( map(action => {
          if (action.payload.exists === false) {
            return null;
          } else {
            const data = action.payload.data() as Client;
            data.id = action.payload.id;
            return data;
          }
        })
      );

      return this.client;
   }

   updateClient(client: Client){
    this.clientDoc = this.afs.doc<Client>(`clients/${client.id}`);
    this.clientDoc.update(client);
   }
}
