export type TenantId = `tenant_${string}`;

export interface Tenant {
  name: string;
  id: TenantId;
}

export interface JwtPayload {
  iss: string;
  sub: string;
  aud: string;
  iat: number;
  exp: number;
  azp: string;
  scope: string;
  org_id: string;
}
