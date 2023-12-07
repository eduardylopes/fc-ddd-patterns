import { describe, expect, it } from 'vitest';
import ProductFactory from './product.factory';
import Product from '../entity/product';

describe('Product factory unit test', () => {
  it('should be able to create a product', () => {
    const product = ProductFactory.create('Product', 1);

    expect(product.id).toBeDefined();
    expect(product.name).toBe('Product');
    expect(product.price).toBe(1);
    expect(product).toBeInstanceOf(Product);
  });
});
