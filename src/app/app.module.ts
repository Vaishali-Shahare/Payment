import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PaymentComponent } from './payment/payment.component';
import { StatusComponent } from './status/status.component';
import { ErrorComponent } from './error/error.component';

const routes:Routes = [
{ path: 'payment', component: PaymentComponent },
{ path: 'status', component: StatusComponent },
{ path: 'error', component: ErrorComponent },
{ path: '', component: PaymentComponent}
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],

  declarations: [
    AppComponent,
    PaymentComponent,
    StatusComponent,
    ErrorComponent
  ],

  exports: [
  	RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
