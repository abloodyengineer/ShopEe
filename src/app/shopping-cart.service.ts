import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { ProductService } from './product.service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ShoppingCartService {
  cartId;
  cart;
  totalPrice=0
  item$: AngularFireObject<unknown>;
 
  constructor(private db: AngularFireDatabase) { }

  private create(){
    return this.db.list("/shopping-carts").push({
      dateCreated:new Date().getTime()
    })
  }
  getCart(): any{
    this.cartId=this.getOrCreateCartId()
    return this.db.object('/shopping-carts/'+ this.cartId).snapshotChanges()
    
  }
  private getOrCreateCartId(){
    this.cartId=localStorage.getItem("cartId")
      if(!this.cartId){
        this.create().then(result=>{
          localStorage.setItem('cartId',result.key)

          return result.key
        })
      }
      else{
        return this.cartId
      }
  }

  addToCart(product){
    this.cartId=this.getOrCreateCartId()
    if(product.key){
      this.item$= this.db.object('/shopping-carts/'+this.cartId+'/items/'+product.key)
       }
      else{
       let item$= this.db.object('/shopping-carts/'+this.cartId+'/items/'+product)
      }
      this.item$.snapshotChanges().pipe(take(1)).subscribe((item:any)=>{
      if(item.payload.val())
      this.item$.update({quantity: item.payload.val().quantity+1})
      else
      this.item$.set({product:product.payload.val() , quantity:1})
    })
  }

  deleteProduct(product){
    if(product.key){
   this.item$= this.db.object('/shopping-carts/'+this.cartId+'/items/'+product.key)
    }
   else{
    let item$= this.db.object('/shopping-carts/'+this.cartId+'/items/'+product)
   }
   this.item$.snapshotChanges().pipe(take(1)).subscribe((item:any)=>{
    if(item.payload.val())
    this.item$.update({quantity: item.payload.val().quantity-1})
    else
    this.item$.set({product:product.payload.val() , quantity:0})
    if(item.payload.val().quantity<=1){
      this.item$.remove()
    }
  })
  }

  getTotalItemCount(cart){
     let shoppingCartItemCount=0;
      for(let productId in cart.payload.val().items){
        shoppingCartItemCount+=cart.payload.val().items[productId].quantity
  }
  return shoppingCartItemCount
}

getTotalCost(){
  this.getCart().pipe(take(1)).subscribe(c=>{
    this.cart=c
    
  })
  this.totalPrice=0
  for(let prodId in this.cart?.payload.val().items){
    
    this.totalPrice+=(this.cart.payload.val().items[prodId].product.price*this.cart.payload.val().items[prodId].quantity)
}
return this.totalPrice
}

clearCart(){
  this.cartId=this.getOrCreateCartId()
  this.db.object('/shopping-carts/'+this.cartId+ '/items').remove()
}

}
