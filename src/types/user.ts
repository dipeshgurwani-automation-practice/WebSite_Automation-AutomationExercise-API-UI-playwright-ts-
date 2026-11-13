export interface User {
  name: string;
  email: string;
  password: string;
  title: string;
  birth_date: string;
  birth_month: string;
  birth_year: string;
  firstname: string;
  lastname: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  zipcode: string;
  state: string;
  city: string;
  mobile_number: string;
}

export interface ApiResponse {
  responseCode: number;
  message?: string;
  [key: string]: unknown;
}

export interface UserDetailResponse extends ApiResponse {
  user: { email: string; first_name: string; city: string };
}

export interface ProductsResponse extends ApiResponse {
  products: { name: string; price: string }[];
}

export interface BrandsResponse extends ApiResponse {
  brands: unknown[];
}
