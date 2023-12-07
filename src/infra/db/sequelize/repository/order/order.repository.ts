import Order from '../../../../../domain/checkout/entity/order';
import OrderItem from '../../../../../domain/checkout/entity/order_item';
import OrderFactory from '../../../../../domain/checkout/factory/order.factory';
import OrderRepositoryInterface from '../../../../../domain/checkout/repository/order-repository.interface';
import OrderModel from './order.model';
import OrderItemModel from './order_item.model';

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.calculateTotal(),
        items: entity.items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    const transaction = await OrderModel.sequelize.transaction();

    try {
      await OrderModel.update(
        {
          customer_id: entity.customerId,
          total: entity.calculateTotal(),
        },
        {
          where: { id: entity.id },
          transaction,
        }
      );

      await OrderItemModel.destroy({
        where: { order_id: entity.id },
        transaction,
      });

      await OrderItemModel.bulkCreate(
        entity.items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          order_id: entity.id,
        })),
        {
          transaction,
        }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async find(id: string): Promise<Order> {
    const order = await OrderModel.findOne({ where: { id } });

    if (!order) {
      throw new Error('Order not found');
    }

    return OrderFactory.create({
      id: order.id,
      customerId: order.customer_id,
      items: order.items.map(
        item =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          )
      ),
    });
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({ include: ['items'] });

    return orders.map(order =>
      OrderFactory.create({
        id: order.id,
        customerId: order.customer_id,
        items: order.items.map(
          item =>
            new OrderItem(
              item.id,
              item.name,
              item.price,
              item.product_id,
              item.quantity
            )
        ),
      })
    );
  }
}
