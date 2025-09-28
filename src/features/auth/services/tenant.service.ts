import { baseServerAxios } from '@/utilities/axios/server-api';

export const getTenantIdApi = async (tenantCode: string) => {
  const response = await baseServerAxios.get(
    `/api/abp/multi-tenancy/tenants/by-name/${tenantCode}`,
  );

  const tenant = response.data;

  if (!tenant || !tenant.success || !tenant.tenantId) {
    throw new Error(`Không tìm thấy cửa hàng [${tenant}]`);
  }

  return tenant.tenantId;
};
