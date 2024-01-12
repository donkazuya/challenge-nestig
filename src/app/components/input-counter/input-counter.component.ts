import { Component, Input } from '@angular/core';
import { IAppState, addToCart, removeFromCart, removeToCart, updateCartTotal } from '../../store/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-input-counter',
  templateUrl: './input-counter.component.html',
  styleUrl: './input-counter.component.scss'
})
export class InputCounterComponent {
  constructor(private store:Store<{app:IAppState}>) {}
  private _counter: number = 0;
  private _product: any;

  get valueCounter(): number {
    return this._counter;
  }

  @Input() set valueCounter(value: number) {
    if(value == null) {
      return
    }
    this._counter = value;
  }

  get product(): any {
    return this._product;
  }

  @Input() set valueProduct(value: number) {
    if(value == null) {
      return
    }
    this._product = value;
  }

  public increment() {
    this.valueCounter++;
    this.store.dispatch(addToCart(this._product.product))
    this.store.dispatch(updateCartTotal())
    return this.valueCounter;
  }

  public decrement() {
    this.valueCounter--;
    this.store.dispatch(removeToCart(this._product.product))
    this.store.dispatch(updateCartTotal())
    return this.valueCounter;
  }

}
