export class Price {
  id: number;
  label: string;
  value: number;
}

export class Product {
  id: number;
  name: string;
  prices: Price[];
}
