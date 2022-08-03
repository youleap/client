import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class TableApiHandler {
  private axiosInstance: AxiosInstance;

  constructor(accessToken?: string, baseUrl?: string) {
    if ((accessToken ?? process.env['ACCESS_TOKEN']) == null) {
      throw new Error('Access token was not provided, please authenticate to the cli "youleap auth login"');
    }

    if ((baseUrl ?? process.env['BASE_URL']) == null) {
      throw new Error('Base url was not provided, please try to re-run sdk generation "youleap generate"');
    }
    this.axiosInstance = axios.create({
      baseURL: baseUrl ?? process.env['BASE_URL'],
      responseType: 'json',
      headers: {
        authorization: `Bearer ${accessToken ?? process.env['BASE_URL']}`,
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

    try {
      const { data } = await this.axiosInstance.request<Response>(options);
      return data;
    } catch (e) {
      throw e;
    }
  }

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
