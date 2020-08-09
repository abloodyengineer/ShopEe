import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
cart$;
totalItemsCount;
  shoppingCartItemCount: number;
  cart:any;
  totalCost: any;
  constructor(private shoppingCartService:ShoppingCartService) {
    // this.totalCost=shoppingCartService.getTotalCost()
    this.cart$=shoppingCartService.getCart()
    
    this.cart$.subscribe(cart=>{
      this.shoppingCartItemCount=shoppingCartService.getTotalItemCount(cart)
      this.cart=cart
      // this.totalCost= cart.payload.val().items.product.price*cart.payload.val().items.quantity
      // this.totalCost=shoppingCartService.getTotalCost()
    }
    )
  
   }

   calculateTotalPrice(a,b){
     return a*b
   }

   removeFromCart(productID){
     this.shoppingCartService.deleteProduct(productID)
   }

   addToCart(productID){
    this.shoppingCartService.addToCart(productID)
   }

   clearCart(){
     this.shoppingCartService.clearCart()
   }
  ngOnInit() {
  }

}
