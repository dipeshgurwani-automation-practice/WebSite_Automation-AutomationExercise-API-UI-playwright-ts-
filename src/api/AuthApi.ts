import { BaseApi } from './BaseApi';
import { ApiResponse } from '../types/user';

export class AuthApi extends BaseApi {
  async verifyLogin(form: Record<string, string>): Promise<ApiResponse> {
    const res = await this.request.post(this.url('/verifyLogin'), { form });
    return this.parse<ApiResponse>(res);
  }
}
