import CartDTO from "../dto/cart.dto.js";

export default class CartRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getAll( filter = {} ) {
        const carts = await this.dao.getAll(filter);
        return carts.map( cart => new CartDTO(cart) );
    }

    async getRawById(cid) {
        const cart = await this.dao.getById(cid);
        return cart;
    }

    async getById(cid){
        const cart = await this.dao.getById(cid);
        return new CartDTO(cart);
    }

    async create(data){
        const cart = await this.dao.create(data);
        return cart;
    }

}