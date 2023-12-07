import CustomerFactory from "./customer.factory";
import Address from "../value-object/address";
import { describe, expect, it } from "vitest";

describe("Customer factory unit test", () => {
  it("should be able to create a customer", () => {
    const customer = CustomerFactory.create("John");
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.Address).toBeUndefined();
  });

  it("should be able to create a customer with an address", () => {
    const address = new Address("Street", 1, "13330-250", "São Paulo");
    let customer = CustomerFactory.createWithAddress("John", address);
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.Address).toBe(address);
  });
});
