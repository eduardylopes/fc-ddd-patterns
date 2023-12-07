import { describe, expect, it } from 'vitest';
import Address from '../value-object/address';
import Customer from './customer';

describe('Customer unit tests', () => {
  it('should not be able to create a customer without an id', () => {
    expect(() => {
      new Customer('', 'John');
    }).toThrowError('Id is required');
  });

  it('should not be able to create a customer without a name', () => {
    expect(() => {
      new Customer('123', '');
    }).toThrowError('Name is required');
  });

  it('should be able to change name', () => {
    const customer = new Customer('123', 'John');

    customer.changeName('Jane');
    expect(customer.name).toBe('Jane');
  });

  it('should be able to activate a customer', () => {
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 123, '13330-250', 'São Paulo');
    customer.Address = address;

    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it('should not be able to activate a customer without address', () => {
    expect(() => {
      const customer = new Customer('1', 'Customer 1');
      customer.activate();
    }).toThrowError('Address is mandatory to activate a customer');
  });

  it('should be able to deactivate a customer', () => {
    const customer = new Customer('1', 'Customer 1');

    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it('should be able to add reward points to a customer', () => {
    const customer = new Customer('1', 'Customer 1');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
