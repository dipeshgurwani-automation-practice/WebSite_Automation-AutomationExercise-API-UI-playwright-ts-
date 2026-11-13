import { APIRequestContext, APIResponse } from '@playwright/test';
import { env } from '../../config/env';

export class BaseApi {
  constructor(protected readonly request: APIRequestContext) {}

  protected url(path: string): string {
    return `${env.apiUrl}${path}`;
  }

  protected async parse<T>(res: APIResponse): Promise<T> {
    return JSON.parse(await res.text()) as T;
  }
}
