import Order from './order';
import OrderItem from './order_item';
import { expect, it, describe } from 'vitest';

describe('Order unit tests', () => {
  it('should be able to create an order', () => {
    const item = new OrderItem('i1', 'test-item', 100, 'p1', 1);
    const order = new Order('o1', '123', [item]);
    expect(order).toBeInstanceOf(Order);
  });

  it('should not be able to create an order without id', () => {
    expect(() => {
      new Order('', '123', []);
    }).toThrowError('Id is required');
  });

  it('should not be able to create an order without customerId', () => {
    expect(() => {
      new Order('123', '', []);
    }).toThrowError('CustomerId is required');
  });

  it('should not be able to create an order without items', () => {
    expect(() => {
      new Order('123', '123', []);
    }).toThrowError('Items are required');
  });

  it('should be able to calculate total', () => {
    const item = new OrderItem('i1', 'Item 1', 100, 'p1', 2);
    const item2 = new OrderItem('i2', 'Item 2', 200, 'p2', 2);
    const order = new Order('o1', 'c1', [item]);

    let total = order.calculateTotal();
    expect(order.calculateTotal()).toBe(200);

    const order2 = new Order('o1', 'c1', [item, item2]);
    total = order2.calculateTotal();
    expect(total).toBe(600);
  });

  it('should not be able to create an order with invalid item quantity', () => {
    expect(() => {
      const item = new OrderItem('i1', 'Item 1', 100, 'p1', 0);
      new Order('o1', 'c1', [item]);
    }).toThrowError('Quantity must be greater than 0');
  });
});
