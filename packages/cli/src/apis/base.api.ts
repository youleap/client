import axios, { AxiosRequestConfig } from 'axios';
import { BaseResponseDto, TableResponseDto } from '../dtos/base.dto';

export async function getBasesByTenantId(accessToken: string, tenantId: string): Promise<Array<BaseResponseDto>> {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: `https://gateway.youleap-local.io/base/tenant/${tenantId}`,
    headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: `Bearer ${accessToken}` },
  };

  try {
    const { data } = await axios.request<Array<BaseResponseDto>>(options);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getTablesByBaseId(accessToken: string, baseId: string): Promise<Array<TableResponseDto>> {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: `https://gateway.youleap-local.io/base/${baseId}/table`,
    headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: `Bearer ${accessToken}` },
  };

  try {
    const { data } = await axios.request<Array<TableResponseDto>>(options);
    return data;
  } catch (e) {
    throw e;
  }
}
