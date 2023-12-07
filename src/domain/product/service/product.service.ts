import Product from '../entity/product';

export default class ProductService {
  static increasePrice(products: Product[], percentage: number): Product[] {
    for (const product of products) {
      product.changePrice((product.price * percentage) / 100 + product.price);
    }

    return products;
  }
}
