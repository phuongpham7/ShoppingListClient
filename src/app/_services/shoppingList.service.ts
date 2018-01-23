import { ShoppingItem } from './../_models/shoppingItem';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../app.config';

@Injectable()
export class ShoppingListService {

    constructor(private http: Http, private config: AppConfig) { }

    getShoppingItems():  Promise<ShoppingItem[]> {
        return this.http.get(this.config.apiUrl + '/shoppingItems/')
            .toPromise()
            .then(response => response.json() as ShoppingItem[])
            .catch(this.handleError);
    }

    createShoppingItem(itemData: ShoppingItem): Promise<ShoppingItem> {
        itemData.user = JSON.parse(localStorage.getItem('currentUser'));
        return this.http.post(this.config.apiUrl + '/shoppingItems/', itemData)
            .toPromise()
            .then(response => response.json() as ShoppingItem)
            .catch(this.handleError);
    }

    updateShoppingItem(itemData: ShoppingItem): Promise<ShoppingItem> {
        return this.http.put(this.config.apiUrl + '/shoppingItems/' + itemData.id, itemData)
            .toPromise()
            .then(response => response.json() as ShoppingItem)
            .catch(this.handleError);
    }

    deleteShoppingItem(id: string): Promise<any> {
        return this.http.delete(this.config.apiUrl + '/shoppingItems/' + id)
            .toPromise()
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Some error occured', error);
        return Promise.reject(error.message || error);
    }

}
