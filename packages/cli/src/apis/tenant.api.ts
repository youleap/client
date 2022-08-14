import axios, { AxiosRequestConfig } from 'axios';
import { TenantResponseDto } from '../dtos/tenant.dto';
import { configUtility } from '../utils/config.utils';

export async function getTenantsByUserId(
  accessToken: string,
  organizationId: string,
  userId: string,
): Promise<Array<TenantResponseDto>> {
  const options: AxiosRequestConfig = {
    method: 'GET',
    baseURL: configUtility.youleapApiBaseUrl,
    url: `organization/${organizationId}/tenants/members/${userId}`,
    headers: { 'content-type': 'application/json', authorization: `Bearer ${accessToken}` },
  };

  try {
    const { data } = await axios.request<Array<TenantResponseDto>>(options);
    return data;
  } catch (e) {
    throw e;
  }
}
