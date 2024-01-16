import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { PopoverConfig } from 'ngx-bootstrap/popover';
import { Store, select } from '@ngrx/store';
import { IAppState, addToCart, updateCartTotal } from '../../store/app.state';
import { Observable, map } from 'rxjs';

export function getPopoverConfig(): PopoverConfig {
  return Object.assign(new PopoverConfig(), {
    placement: 'top',
    container: 'body',
    triggers: 'mouseenter:mouseleave',
    delay: 2000,
  });
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  providers: [{ provide: PopoverConfig, useFactory: getPopoverConfig }]
})
export class ProductListComponent implements OnInit  {
  cartItems$: Observable<any>;

  constructor(
    private ProductsService: ProductsService, 
    private store:Store<{app:IAppState}>
  ) {
    this.cartItems$ = this.store.pipe(select('app', 'cartList'))
  }

  sortby: boolean = false;
  isCollapsed: boolean = true;
  allProducts: any = [];
  allCategories: any = [];
  categorieSelected: any = "";
  filteredProducts: any[] = [];
  min: string = "";
  max: string = "";
  cartList: any = [];
  cartList$: any = this.store.select('app').pipe(
    map(e => {
      e.cartList
    })
  )

  async ngOnInit() {
    this.allProducts = await this.ProductsService.searchAllProducts()

    this.allCategories = await this.ProductsService.getAllCategories()
    
  }

  async searchAllProducts() {
    this.allProducts = await this.ProductsService.searchAllProducts()
  }

  async filters(category?: any) {
    await this.searchAllProducts()

    this.selectCategory(category)
    this.filterByPrice()
    
  }

  changeSortby() {
    
    this.sortby = !this.sortby
    
    
      if(this.sortby) {
        this.allProducts.sort((a:any, b:any ) => a.price - b.price)
      } else {
        this.allProducts.sort((a:any, b:any ) => b.price - a.price)
      }
    
  }

  selectCategory(category: any) {

    if(category) {
      this.filteredProducts = this.allProducts.filter((product: any) => product.category === category)
  
      this.allProducts = this.filteredProducts
    } 

    
  }

  filterByPrice() {
    if(this.min !== '' && this.max !== '') {
      
      let min = parseFloat(this.min)
      let max = parseFloat(this.max)
      
      
      
      this.filteredProducts = this.allProducts.filter((product: any) =>
        (!min || product.price >= min) && (!max || product.price <= max)
      )
  
      this.allProducts = this.filteredProducts
    } 
    
  }

  discount(price: number):string {
    let value:any = price * 0.50
    
    return `${value}` 
  }

  addCart(product:any) {

    // this.cartList = this.cartList$
    
    this.store.dispatch(addToCart(product))
    this.store.dispatch(updateCartTotal())
    
    // localStorage.setItem('cartList', JSON.stringify(this.cartList))


  }
}
