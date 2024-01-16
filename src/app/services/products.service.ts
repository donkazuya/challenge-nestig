import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    constructor(private http: HttpClient){}

    async searchAllProducts() {
        return this.http.get('https://fakestoreapi.com/products')
        .toPromise()
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        }
        ) 
    }

    async getAllCategories() {
        return this.http.get('https://fakestoreapi.com/products/categories')
        .toPromise()
        .then((res) => {
            return res
        }).catch((err) => {
            return err
        });
    }

    async getCategorySpecific(category: string, order?: string) {
        return this.http.get(`https://fakestoreapi.com/products/category/${category}`)
        .toPromise()
        .then((res) => {
            return res
        }).catch((err) => err);
    }

    async sortProducts(order: string) {
        return this.http.get(`https://fakestoreapi.com/products?sort=${order}`)
        .toPromise()
        .then((res) => {
            return res
        }).catch((err) => err);
    }
}