import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ShoppingItem } from './../../_models/index';
import { ShoppingListService } from '../../_services/index';

@Component({
    selector: 'app-shoppinglist',
    templateUrl: './shoppingList.component.html',
    styleUrls: ['./shoppinglist.component.css']
})

export class ShoppingListComponent implements OnInit {
    items: ShoppingItem[];
    newItem: ShoppingItem = new ShoppingItem();
    editing = false;
    editingItem: ShoppingItem = new ShoppingItem();

    constructor(
        private shoppingListService: ShoppingListService) {}

    ngOnInit(): void {
      this.getShoppingItems();
    }

    getShoppingItems(): void {
        this.shoppingListService.getShoppingItems().then(items => this.items = items);
    }

    createShoppingItem(itemForm: NgForm): void {
        this.shoppingListService.createShoppingItem(this.newItem)
            .then(createShoppingItem => {
                itemForm.reset();
                this.newItem = new ShoppingItem();
                this.items.unshift(createShoppingItem);
            });
    }

    deleteShoppingItem(id: string): void {
        this.shoppingListService.deleteShoppingItem(id)
            .then(() => {
                this.items =  this.items.filter(item => item.id !== id);
            });
    }

    updateShoppingItem(itemData: ShoppingItem): void {
        console.log(itemData);
        this.shoppingListService.updateShoppingItem(itemData)
            .then(updatedItem => {
                const existingItem = this.items.find(item => item.id === updatedItem.id);
                Object.assign(existingItem, updatedItem);
                this.clearEditing();
            });
    }

    toggleCompleted(itemData: ShoppingItem): void {
        itemData.completed = !itemData.completed;
        this.shoppingListService.updateShoppingItem(itemData)
            .then(updatedItem => {
                const existingItem = this.items.find(item => item.id === updatedItem.id);
                Object.assign(existingItem, updatedItem);
            });
    }

    editShoppingItem(itemData: ShoppingItem): void {
        this.editing = true;
        Object.assign(this.editingItem, itemData);
    }

    clearEditing(): void {
        this.editingItem = new ShoppingItem();
        this.editing = false;
    }
}
