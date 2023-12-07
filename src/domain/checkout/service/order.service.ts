import Order from '../entity/order';
import OrderItem from '../entity/order_item';
import { v4 as uuid } from 'uuid';
import OrderFactory from '../factory/order.factory';
import Customer from '../../customer/entity/customer';

export default class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error('Order must have at least one item');
    }

    const order = OrderFactory.create({
      id: uuid(),
      customerId: customer.id,
      items,
    });

    const rewardPoints = order.calculateTotal() / 2
    customer.addRewardPoints(rewardPoints);
    return order;
  }

  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.calculateTotal(), 0);
  }
}
