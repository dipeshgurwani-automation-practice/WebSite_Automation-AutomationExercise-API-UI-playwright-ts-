import { BaseApi } from './BaseApi';
import { ApiResponse, User, UserDetailResponse } from '../types/user';

// This class has one method for each account API call.
// Each method does 3 simple steps:
//   1. Send the request to the server
//   2. Read the reply
//   3. Give the reply back to the test
export class AccountApi extends BaseApi {
  // Create a new account
  async create(user: User): Promise<ApiResponse> {
    const response = await this.request.post(this.url('/createAccount'), {
      form: { ...user }, // send all user details
    });
    return this.parse<ApiResponse>(response);
  }

  // Change the details of an existing account
  async update(user: User): Promise<ApiResponse> {
    const response = await this.request.put(this.url('/updateAccount'), {
      form: { ...user }, // send all user details
    });
    return this.parse<ApiResponse>(response);
  }

  // Delete an account (needs only email and password)
  async delete(user: Pick<User, 'email' | 'password'>): Promise<ApiResponse> {
    const response = await this.request.delete(this.url('/deleteAccount'), {
      form: { email: user.email, password: user.password },
    });
    return this.parse<ApiResponse>(response);
  }

  // Get the details of a user by email
  async getByEmail(email: string): Promise<UserDetailResponse> {
    const response = await this.request.get(this.url('/getUserDetailByEmail'), {
      params: { email }, // added to the URL as ?email=...
    });
    return this.parse<UserDetailResponse>(response);
  }
}
