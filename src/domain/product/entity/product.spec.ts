import { describe, expect, it } from 'vitest';
import Product from './product';

describe('Product unit tests', () => {
  it('should not be able create a product without id', () => {
    expect(() => {
      new Product('', 'Product 1', 100);
    }).toThrowError('Id is required');
  });

  it('should not be able to create a product without name', () => {
    expect(() => {
      new Product('123', '', 100);
    }).toThrowError('Name is required');
  });

  it('should not be able to create a product with a price less than 0', () => {
    expect(() => {
      new Product('123', 'Name', -1);
    }).toThrowError('Price must be greater than zero');
  });

  it('should be able to change product name', () => {
    const product = new Product('123', 'Product 1', 100);
    product.changeName('Product 2');
    expect(product.name).toBe('Product 2');
  });

  it('should be able to chante product price', () => {
    const product = new Product('123', 'Product 1', 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});
