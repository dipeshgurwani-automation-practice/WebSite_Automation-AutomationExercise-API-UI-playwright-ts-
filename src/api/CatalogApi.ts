import { BaseApi } from './BaseApi';
import { ApiResponse, BrandsResponse, ProductsResponse } from '../types/user';

export class CatalogApi extends BaseApi {
  async getProducts(): Promise<ProductsResponse> {
    const res = await this.request.get(this.url('/productsList'));
    return this.parse<ProductsResponse>(res);
  }

  async getBrands(): Promise<BrandsResponse> {
    const res = await this.request.get(this.url('/brandsList'));
    return this.parse<BrandsResponse>(res);
  }

  async searchProduct(term?: string): Promise<ProductsResponse> {
    const options = term === undefined ? {} : { form: { search_product: term } };
    const res = await this.request.post(this.url('/searchProduct'), options);
    return this.parse<ProductsResponse>(res);
  }

  async callWithMethod(method: string, endpoint: string): Promise<ApiResponse> {
    const res = await this.request.fetch(this.url(endpoint), { method });
    return this.parse<ApiResponse>(res);
  }
}
