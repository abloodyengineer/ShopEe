import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { UserService } from './user.service';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database'; 
import { RouterModule } from '@angular/router'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
import { CustomFormsModule } from 'ngx-custom-validators'; 
// import { DataTablesModule } from 'angular-datatables';
// import { DataTableModule } from 'ng-angular9-datatable';
// import { DataTableModule } from 'angular-4-data-table';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
// import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductForm2Component } from './admin/product-form2/product-form2.component';
import { ShoppingCartService } from './shopping-cart.service'
import { CheckOutService } from './check-out.service';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component'

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    // ProductFormComponent,
    ProductForm2Component,
    ShoppingCartSummaryComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    // DataTablesModule,
    // DataTableModule,
    FormsModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'login', component: LoginComponent },

      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },

      
      { 
        path: 'admin/products/new', 
        component: ProductForm2Component, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/products/:id', 
        component: ProductForm2Component, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/products', 
        component: AdminProductsComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/orders', 
        component: AdminOrdersComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      }
    ])    
  ],
  exports: [RouterModule],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    CheckOutService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
