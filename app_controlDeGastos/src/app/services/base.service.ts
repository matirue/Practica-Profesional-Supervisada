import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

    protected itemsCollection: AngularFirestoreCollection<T>;
    items: Observable<T[]>;    

    constructor(private afs: AngularFirestore) {
      
    }

    protected setCollection(collName:string){
      this.itemsCollection = this.afs.collection<T>(collName);
      this.items = this.itemsCollection.valueChanges({idField: "docId"});
    }
    
    protected setCollectionOrderBy2(collName:string, field:string, field2:string){
      this.itemsCollection = this.afs.collection<T>(collName, ref => ref.orderBy(field, "asc").orderBy(field2, "asc"));
      this.items = this.itemsCollection.valueChanges({idField: "docId"});
    }

    protected setCollectionOrderBy(collName:string, field:string){
      this.itemsCollection = this.afs.collection<T>(collName, ref => ref.orderBy(field, "asc"));
      this.items = this.itemsCollection.valueChanges({idField: "docId"});
    }
    
    protected getItemByFilter(campo:string, value:any){
      return this.itemsCollection.ref.where(campo,'==',value).get();
    }

    protected getObservableItemByFilter(collName:string, campo:string, value:any){
      return this.afs.collection<T>(collName, ref => ref.where(campo, '==', value)).valueChanges({idField: "docId"});
    }

    addItem(item: T) {
      return this.itemsCollection.add(Object.assign({}, item));    
    }

    setItemWithId(item: T, id:string) {
      return this.itemsCollection.doc(id).set(Object.assign({}, item));    
    }
    
    getItem(id:string){
      return this.itemsCollection.doc(id).get();
    }

    /*
    < menor que
    <= menor o igual que
    == igual que
    > mayor que
    >= mayor que o igual que
    != no igual a
    array-contains
    array-contains-any
    in
    not-in

    this.service.items.subscribe((items) =>{
      // array de json
      console.log(items);
    });

    this.peliculaService.getItemByFilter("campo", valor).then((querySnapshot)=>{
      querySnapshot.forEach((doc) => {        
        console.log(doc.id, " => ", doc.data());        
      });            
    }).catch((err)=>{
      console.log(err);
    });

    */
}
