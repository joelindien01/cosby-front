export class Customer {
  id: number;
  name: string;
  description: string;
  contacts: Contact[];
  deliveryInformations: DeliveryInformation[];
  billingAddress: Address;
  location: Address;


}

export class Contact {
  id: number;
  name: string;
  phoneNumber: string;
  emailAddresses: string;
  contactFunction: string;
  customer: Customer;
}

export class DeliveryInformation {
  id: number;
  vessel: string;
  imo: string;
  flag: string;
  master: string;
  port: string;
  customer: Customer;
}

export interface EmailAddress {
  id: number;
  email: string;
}

export class Address {
  id: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

