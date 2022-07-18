import axios, { AxiosRequestConfig } from 'axios';
import { TenantResponseDto } from '../dtos/tenant.dto';

export async function getTenantsByUserId(
  accessToken: string,
  organizationId: string,
  userId: string,
): Promise<Array<TenantResponseDto>> {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: `https://gateway.youleap-local.io/organization/${organizationId}/tenants/members/${userId}`,
    headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: `Bearer ${accessToken}` },
  };

  try {
    const { data } = await axios.request<Array<TenantResponseDto>>(options);
    return data;
  } catch (e) {
    throw e;
  }
}
