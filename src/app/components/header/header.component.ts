import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../store/app.state';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})



export class HeaderComponent implements OnInit{
  cartItems$: Observable<any>;
  isOpen: boolean = false
  menuOpen: boolean = true
  cartItens: any[] = JSON.parse(localStorage.getItem('cartList') as any)
  productList: any[] = []


  constructor(private store:Store<{app:IAppState}>) {
    this.cartItems$ = this.store.pipe(select('app', 'cartList'))

    
  }

  ngOnInit() {
    this.cartItems$.subscribe(data => {
      this.productList = data
    })
    
  }
  @HostListener("window:resize", [])

  public onResize() {
    this.detectScreenSize();
  }

  public ngAfterViewInit() {
      this.detectScreenSize();
  }

  private detectScreenSize() {
      const height = window.innerHeight;
      const width = window.innerWidth;
      

      if(width > 500) {
        this.menuOpen = true;
      } else {
        this.menuOpen = false;
      }
      
  }
  

  toggleCart() {
    this.isOpen = !this.isOpen
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen
  }
}
