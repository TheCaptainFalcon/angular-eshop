import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {

    // fix later as it needs to be an obj
    constructor(public items: ShoppingCartItem[]) {}

    get productIds() {
        return Object.keys(this.items);
    }

    get totalItemsCount() {
        let count = 0;
        for (const productId in this.items) {
            count += this.items[productId].quantity
            return count;
        }
    }
}