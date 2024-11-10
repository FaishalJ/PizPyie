export interface IPizza {
  id: number;
  imageUrl: string;
  ingredients: string[];
  name: string;
  soldOut: boolean;
  unitPrice: number;
}

export interface ICartElement extends IPizza {
  count: number;
  totalPrice: number;
}

export interface IPosition {
  lat: number;
  lng: number;
}

export interface ILocation {
  formatted: string;
  county: string;
  country: string;
  suburb: string;
  city: string;
  street: string;
}

export interface IClientInput {
  name: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  deliver: number;
  total: number;
}

export interface IClientDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  orderId: string;
  deliver: number;
  total: number;
  cart: ICartElement[];
}

export interface ILoginInput {
  name: string;
  email: string;
}