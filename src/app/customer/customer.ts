export interface Customer {
  id: number;
  name: string;
  contactEmailAddresses: EmailAddress[];
  deliveryAddress: Address[];
  billingAddress: Address;
  phoneNumber: string;
  location: Address;
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

