import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators"

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) { 
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges();
  }
  get(productId){
 
    return this.db.object('/products/' + productId).snapshotChanges().pipe(map(categories=>{
     
        const value = categories.payload.val()
        const key = categories.payload.key;
        return {key, value};
    }));
   
  }

  update(productId, product){
    return this.db.object('/products/'+ productId).update(product)
  }

  remove(productId){
    return this.db.object('/products/'+ productId).remove()
  }
}
