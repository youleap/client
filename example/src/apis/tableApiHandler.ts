import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class TableApiHandler {
  private axiosInstance: AxiosInstance;

  private baseUrl: string = 'https://gateway.youleap-local.io/';
  private accessToken: string = '';

  constructor(accessToken?: string) {
    if ((accessToken ?? this.accessToken) == null) {
      throw new Error('Access token was not provided, please authenticate to the cli "youleap auth login"');
    }

    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      responseType: 'json',
      headers: {
        authorization: `Bearer ${accessToken ?? this.accessToken}`,
      },
    });
  }
  public async findUniqueQueryApi<Args, Response>(tableId: string, args?: Args): Promise<Response> {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `/base/table/${tableId}/query/unique`,
      data: args,
    };

    try {
      const { data } = await this.axiosInstance.request<Response>(options);
      return data;
    } catch (e) {
      throw e;
    }
  }

  public async findFirstQueryApi<Args, Response>(tableId: string, args?: Args): Promise<Response> {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `/base/table/${tableId}/query`,
      data: args,
    };

      const { data } = await this.axiosInstance.request<Response>(options);
      return data;

  public async findManyQueryApi<Args, Response>(tableId: string, args?: Args): Promise<Response> {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `/base/table/${tableId}/query/many`,
      data: args,
    };

    try {
      const { data } = await this.axiosInstance.request<Response>(options);
      return data;
    } catch (e) {
      throw e;
    }
  }

  public async createQueryApi<Args, Response>(tableId: string, args?: Args): Promise<Response> {
    const options: AxiosRequestConfig = {
      method: 'POST',
      url: `/base/table/${tableId}/query`,
      data: args,
    };

    try {
      const { data } = await this.axiosInstance.request<Response>(options);
      return data;
    } catch (e) {
      throw e;
    }
  }

  public async createManyQueryApi<Args, Response>(tableId: string, args?: Args): Promise<Response> {
    const options: AxiosRequestConfig = {
      method: 'POST',
      url: `/base/table/${tableId}/query/many`,
      data: args,
    };

    try {
      const { data } = await this.axiosInstance.request<Response>(options);
      return data;
    } catch (e) {
      throw e;
    }
  }

  public async deleteQueryApi<Args, Response>(tableId: string, args?: Args): Promise<Response> {
    const options: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/base/table/${tableId}/query`,
      data: args,
    };

    try {
      const { data } = await this.axiosInstance.request<Response>(options);
      return data;
    } catch (e) {
      throw e;
    }
  }

  public async deleteManyQueryApi<Args, Response>(tableId: string, args?: Args): Promise<Response> {
    const options: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/base/table/${tableId}/query/many`,
      data: args,
    };

    try {
      const { data } = await this.axiosInstance.request<Response>(options);
      return data;
    } catch (e) {
      throw e;
    }
  }

  public async updateQueryApi<Args, Response>(tableId: string, args?: Args): Promise<Response> {
    const options: AxiosRequestConfig = {
      method: 'PATCH',
      url: `/base/table/${tableId}/query/many`,
      data: args,
    };

    try {
      const { data } = await this.axiosInstance.request<Response>(options);
      return data;
    } catch (e) {
      throw e;
    }
  }

  public async updateManyQueryApi<Args, Response>(tableId: string, args?: Args): Promise<Response> {
    const options: AxiosRequestConfig = {
      method: 'PATCH',
      url: `/base/table/${tableId}/query/many`,
      data: args,
    };

    try {
      const { data } = await this.axiosInstance.request<Response>(options);
      return data;
    } catch (e) {
      throw e;
    }
  }
}
