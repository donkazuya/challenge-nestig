import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState, loadCartFromSessionStorage, updateCartSubTotal, updateCartTotal } from '../../store/app.state';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  cartItems$: Observable<any> = this.store.pipe(select('app', 'cartList'));
  cartTotal$: Observable<any> = this.store.pipe(select('app', 'total'));
  cartSubTotal$: Observable<any> = this.store.pipe(select('app', 'subTotal'));
  productList: any[] = []
  

  constructor(
    private store:Store<{app:IAppState}>
  ) {
    this.store.dispatch(loadCartFromSessionStorage());
    this.store.dispatch(updateCartTotal())
    this.store.dispatch(updateCartSubTotal())

    this.cartItems$ = this.cartItems$.pipe(
      tap(() => {})
    );
  }
  

  ngOnInit() {
    this.cartItems$.subscribe(data => {
      this.productList = data
    })
  }
}
