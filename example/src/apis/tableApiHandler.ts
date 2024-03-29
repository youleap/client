import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ErrorData } from '../types/common';

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
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
  }
  public async findUniqueQueryApi<Args, Response>(tableId: string, args?: Args): Promise<Response> {
    try {
      const options: AxiosRequestConfig<Args> = {
        method: 'POST',
        url: `/base/table/${tableId}/query/find/unique`,
        data: args,
      };

      const { data } = await this.axiosInstance.request<Response>(options);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data != null) {
        const errorData: ErrorData = error.response.data as ErrorData;
        console.error(errorData.message, errorData);
        throw new Error(errorData.message);
      }
      throw error;
    }
  }

  public async findFirstQueryApi<Args, Response>(tableId: string, args?: Args): Promise<Response> {
    try {
      const options: AxiosRequestConfig = {
        method: 'POST',
        url: `/base/table/${tableId}/query/find`,
        data: args,
      };

      const { data } = await this.axiosInstance.request<Response>(options);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data != null) {
        const errorData: ErrorData = error.response.data as ErrorData;
        console.error(errorData);
        throw new Error(errorData.message);
      }
      throw error;
    }
  }

  public async findManyQueryApi<Args, Response>(tableId: string, args?: Args): Promise<Response> {
    try {
      const options: AxiosRequestConfig = {
        method: 'POST',
        url: `/base/table/${tableId}/query/find/many`,
        data: args,
      };

      const { data } = await this.axiosInstance.request<Response>(options);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data != null) {
        const errorData: ErrorData = error.response.data as ErrorData;
        console.error(errorData);
        throw new Error(errorData.message);
      }
      throw error;
    }
  }

  public async createQueryApi<Args, Response>(tableId: string, args?: Args): Promise<Response> {
    try {
      const options: AxiosRequestConfig = {
        method: 'POST',
        url: `/base/table/${tableId}/query/create`,
        data: args,
      };

      const { data } = await this.axiosInstance.request<Response>(options);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data != null) {
        const errorData: ErrorData = error.response.data as ErrorData;
        console.error(errorData);
        throw new Error(errorData.message);
      }
      throw error;
    }
  }

  public async createManyQueryApi<Args, Response>(tableId: string, args?: Args): Promise<Response> {
    try {
      const options: AxiosRequestConfig = {
        method: 'POST',
        url: `/base/table/${tableId}/query/create/many`,
        data: args,
      };

      const { data } = await this.axiosInstance.request<Response>(options);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data != null) {
        const errorData: ErrorData = error.response.data as ErrorData;
        console.error(errorData);
        throw new Error(errorData.message);
      }
      throw error;
    }
  }

  public async deleteQueryApi<Args, Response>(tableId: string, args?: Args): Promise<Response> {
    try {
      const options: AxiosRequestConfig = {
        method: 'POST',
        url: `/base/table/${tableId}/query/delete`,
        data: args,
      };

      const { data } = await this.axiosInstance.request<Response>(options);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data != null) {
        const errorData: ErrorData = error.response.data as ErrorData;
        console.error(errorData);
        throw new Error(errorData.message);
      }
      throw error;
    }
  }

  public async deleteManyQueryApi<Args, Response>(tableId: string, args?: Args): Promise<Response> {
    try {
      const options: AxiosRequestConfig = {
        method: 'POST',
        url: `/base/table/${tableId}/query/delete/many`,
        data: args,
      };

      const { data } = await this.axiosInstance.request<Response>(options);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data != null) {
        const errorData: ErrorData = error.response.data as ErrorData;
        console.error(errorData);
        throw new Error(errorData.message);
      }
      throw error;
    }
  }

  public async updateQueryApi<Args, Response>(tableId: string, args?: Args): Promise<Response> {
    try {
      const options: AxiosRequestConfig = {
        method: 'POST',
        url: `/base/table/${tableId}/query/update`,
        data: args,
      };

      const { data } = await this.axiosInstance.request<Response>(options);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data != null) {
        const errorData: ErrorData = error.response.data as ErrorData;
        console.error(errorData);
        throw new Error(errorData.message);
      }
      throw error;
    }
  }

  public async updateManyQueryApi<Args, Response>(tableId: string, args?: Args): Promise<Response> {
    try {
      const options: AxiosRequestConfig = {
        method: 'POST',
        url: `/base/table/${tableId}/query/update/many`,
        data: args,
      };

      const { data } = await this.axiosInstance.request<Response>(options);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data != null) {
        const errorData: ErrorData = error.response.data as ErrorData;
        console.error(errorData);
        throw new Error(errorData.message);
      }
      throw error;
    }
  }
}
