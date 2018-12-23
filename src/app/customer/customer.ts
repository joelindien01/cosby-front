export class Customer {
  id: number;
  name: string;
  contacts: Contact[];
  deliveryInformations: DeliveryInformation[];
  billingAddress: Address;
  location: Address;
}

export class Contact {
  id: number;
  name: string;
  phoneNumber: string;
  emailAddresses: EmailAddress[];
  customer: Customer;
}

export class DeliveryInformation {
  id: number;
  vessel: string;
  imo: string;
  flag: string;
  master: string;
  customer: Customer;
}

export interface EmailAddress {
  id: number;
  email: string;
}

export interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

