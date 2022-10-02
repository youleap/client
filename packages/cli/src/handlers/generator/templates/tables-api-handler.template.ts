export const TABLE_API_HANDLER = ` 
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class TableApiHandler {
  private axiosInstance: AxiosInstance;
  
  constructor(accessToken?: string) {
    if ((accessToken ?? this.accessToken) == null) {
      throw new Error('Access token was not provided, please authenticate to the cli "youleap auth login"');
    }

    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      responseType: 'json',
      headers: {
        authorization: \`Bearer \${accessToken ?? this.accessToken}\`,
      },
    });
  }
  public async findUniqueQueryApi<Args, Response>(tableId: string, args?: Args): Promise<Response> {
    try {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: \`/base/table/\${tableId}/query/unique\`,
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

  public async findFirstQueryApi<Args, Response>(tableId: string, args?: Args): Promise<Response> {
    try {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: \`/base/table/\${tableId}/query\`,
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
      method: 'GET',
      url: \`/base/table/\${tableId}/query/many\`,
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
      url: \`/base/table/\${tableId}/query\`,
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

  public async createManyQueryApi<Args, Response>(tableId: string, args?: Args): Promise<Response> {
    try {
    const options: AxiosRequestConfig = {
      method: 'POST',
      url: \`/base/table/\${tableId}/query/many\`,
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
      method: 'DELETE',
      url: \`/base/table/\${tableId}/query\`,
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
      method: 'DELETE',
      url: \`/base/table/\${tableId}/query/many\`,
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
      method: 'PATCH',
      url: \`/base/table/\${tableId}/query/many\`,
      data: args,
    };

    const { data } = await this.axiosInstance.request<Response>(options);
    return data;
  }

  public async updateManyQueryApi<Args, Response>(tableId: string, args?: Args): Promise<Response> {
    try {
    const options: AxiosRequestConfig = {
      method: 'PATCH',
      url: \`/base/table/\${tableId}/query/many\`,
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

`;
