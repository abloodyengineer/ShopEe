import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { take,map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { pipe } from 'rxjs'
import { CheckOutService } from '../check-out.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy{
  subscription: Subscription;
  usersub:Subscription;
  cart:any;
  item:any;
  product=[]
  quantity=[];
  userId: string;
  result: any;
  constructor(shoppingCart:ShoppingCartService,private checkOut: CheckOutService,private auth:AuthService, private router:Router) {
    this.subscription = shoppingCart.getCart().pipe(take(1)).subscribe(cart=>this.cart=cart)
    this.usersub=auth.user$.subscribe(user=>this.userId=user.uid)
   }

  ngOnInit() {
  }
  ngOnDestroy(){
this.subscription.unsubscribe()
this.usersub.unsubscribe()
  }

  placeOrder(ship){

    console.log(ship.value)
    let item:any;
    for(item in this.cart.payload.val().items){
      
      this.product.push({
        title:this.cart.payload.val().items[item].product.title,
        imageUrl:this.cart.payload.val().items[item].product.imageUrl,
        price: this.cart.payload.val().items[item].product.price,
        quantity: this.cart.payload.val().items[item].quantity
      })
      
    }
    let order={
      userId: this.userId,
      datePlaced: new Date().getTime(),
      ship: ship.value,
      product: this.product
      }
      console.log(order)
      this.result =this.checkOut.placeOrder(order)
      // console.log(this.result)
      this.router.navigate(["/order-success",this.result.key])
    }
  }


