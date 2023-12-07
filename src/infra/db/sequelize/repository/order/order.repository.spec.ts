import { Sequelize } from 'sequelize-typescript';

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import CustomerModel from '../customer/customer.model';
import OrderModel from './order.model';
import OrderItemModel from './order_item.model';
import ProductModel from '../product/product.model';
import CustomerRepository from '../customer/customer.repository';
import Customer from '../../../../../domain/customer/entity/customer';
import Address from '../../../../../domain/customer/value-object/address';
import ProductRepository from '../product/product.repository';
import Product from '../../../../../domain/product/entity/product';
import OrderItem from '../../../../../domain/checkout/entity/order_item';
import Order from '../../../../../domain/checkout/entity/order';
import OrderRepository from './order.repository';

describe('Order repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should be able create a new order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order('123', '123', [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: order.calculateTotal(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: '123',
          product_id: '123',
        },
      ],
    });
  });
});
