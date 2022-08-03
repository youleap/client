import axios, { AxiosRequestConfig } from 'axios';
import {
  BatchPayload,
  CheckSelect,
  Furniture,
  FurnitureCreateArgs,
  FurnitureCreateManyArgs,
  FurnitureDeleteArgs,
  FurnitureDeleteManyArgs,
  FurnitureFindFirstArgs,
  FurnitureFindManyArgs,
  FurnitureFindUniqueArgs,
  FurnitureGetPayload,
  FurnitureUpdateArgs,
  FurnitureUpdateManyArgs,
  SelectSubset,
} from '../types/index';

const accessToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImJybXJJRXQ1STFYaEJ4eTRGMklaZCJ9.eyJpc3MiOiJodHRwczovL3lvdWxlYXAuZXUuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE1MjIzNTQ2MDM4MDgzMzMyOTIxIiwiYXVkIjoiaHR0cHM6Ly9nYXRld2F5LnlvdWxlYXAtbG9jYWwuaW8vYmFzZSIsImlhdCI6MTY1OTQ0MzA5MSwiZXhwIjoxNjU5NTI5NDkxLCJhenAiOiJwRWszWXhQNDdzckNGcDdaRmRtb2o5RlIwSVh2dWxxeiIsInNjb3BlIjoiYmFzZTpnZXQgdGFibGU6cXVlcnkiLCJvcmdfaWQiOiJvcmdfcHZpSTJQdWNwUUxKQU5QbSJ9.pRe0eGY9UyDXdFWRv9B7il73UPO0PKexEmTkAc8H06C4iRQu4TVxgaZrEN8T94qPW4OBOeQUHWjVd7PnI6kTkOF3IrAphGZEB7yoVRr8lkBjv_i4Z2sbdNG7DhHKIXs74bjkgsPtR_SztMq2QJSDqPE_-LoqzGq7Qh4ivpUnAVcnV8-JzO672fRx2Ksd7gHm6afm5hlp05BYcfn6Kn-UssHJMmv_QMNH1NrWa5qx9mPE0CeROHMVDVijRe7-N9YgaKL-kLY6TBiT3rgKVqtkJXstmeByd7eJwUR19l1a8my8JrUJNNI-BeoiupOLat2frTAPEhHE6vMbXp-GC5uE5Q';

export async function findUniqueQueryApi<T extends FurnitureFindUniqueArgs>(
  tableId: string,
  args?: SelectSubset<T, FurnitureFindUniqueArgs>,
): Promise<CheckSelect<T, Furniture, FurnitureGetPayload<T>>> {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: `https://gateway.youleap-local.io/base/table/${tableId}/query/unique`,
    headers: { 'content-type': 'application/json', authorization: `Bearer ${accessToken}` },
    data: args,
  };

  try {
    const { data } = await axios.request<CheckSelect<T, Furniture, FurnitureGetPayload<T>>>(options);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function findFirstQueryApi<T extends FurnitureFindFirstArgs>(
  tableId: string,
  args?: SelectSubset<T, FurnitureFindFirstArgs>,
): Promise<CheckSelect<T, Furniture, FurnitureGetPayload<T>>> {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: `https://gateway.youleap-local.io/base/table/${tableId}/query`,
    headers: { 'content-type': 'application/json', authorization: `Bearer ${accessToken}` },
    data: args,
  };

  try {
    const { data } = await axios.request<CheckSelect<T, Furniture, FurnitureGetPayload<T>>>(options);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function findManyQueryApi<T extends FurnitureFindManyArgs>(
  tableId: string,
  args?: SelectSubset<T, FurnitureFindManyArgs>,
): Promise<CheckSelect<T, Array<Furniture>, Array<FurnitureGetPayload<T>>>> {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: `https://gateway.youleap-local.io/base/table/${tableId}/query/many`,
    headers: { 'content-type': 'application/json', authorization: `Bearer ${accessToken}` },
    data: args,
  };

  try {
    const { data } = await axios.request<CheckSelect<T, Array<Furniture>, Array<FurnitureGetPayload<T>>>>(options);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function createQueryApi<T extends FurnitureCreateArgs>(
  tableId: string,
  args?: SelectSubset<T, FurnitureCreateArgs>,
): Promise<CheckSelect<T, Furniture, FurnitureGetPayload<T>>> {
  const options: AxiosRequestConfig = {
    method: 'POST',
    url: `https://gateway.youleap-local.io/base/table/${tableId}/query`,
    headers: { 'content-type': 'application/json', authorization: `Bearer ${accessToken}` },
    data: args,
  };

  try {
    const { data } = await axios.request<CheckSelect<T, Furniture, FurnitureGetPayload<T>>>(options);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function createManyQueryApi<T extends FurnitureCreateManyArgs>(
  tableId: string,
  args?: SelectSubset<T, FurnitureCreateManyArgs>,
): Promise<BatchPayload> {
  const options: AxiosRequestConfig = {
    method: 'POST',
    url: `https://gateway.youleap-local.io/base/table/${tableId}/query/many`,
    headers: { 'content-type': 'application/json', authorization: `Bearer ${accessToken}` },
    data: args,
  };

  try {
    const { data } = await axios.request<BatchPayload>(options);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteQueryApi<T extends FurnitureDeleteArgs>(
  tableId: string,
  args?: SelectSubset<T, FurnitureDeleteArgs>,
): Promise<CheckSelect<T, Furniture, FurnitureGetPayload<T>>> {
  const options: AxiosRequestConfig = {
    method: 'DELETE',
    url: `https://gateway.youleap-local.io/base/table/${tableId}/query`,
    headers: { 'content-type': 'application/json', authorization: `Bearer ${accessToken}` },
    data: args,
  };

  try {
    const { data } = await axios.request<CheckSelect<T, Furniture, FurnitureGetPayload<T>>>(options);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function deleteManyQueryApi<T extends FurnitureDeleteManyArgs>(
  tableId: string,
  args?: SelectSubset<T, FurnitureDeleteManyArgs>,
): Promise<BatchPayload> {
  const options: AxiosRequestConfig = {
    method: 'DELETE',
    url: `https://gateway.youleap-local.io/base/table/${tableId}/query/many`,
    headers: { 'content-type': 'application/json', authorization: `Bearer ${accessToken}` },
    data: args,
  };

  try {
    const { data } = await axios.request<BatchPayload>(options);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function updateQueryApi<T extends FurnitureUpdateArgs>(
  tableId: string,
  args?: SelectSubset<T, FurnitureUpdateArgs>,
): Promise<CheckSelect<T, Furniture, FurnitureGetPayload<T>>> {
  const options: AxiosRequestConfig = {
    method: 'PATCH',
    url: `https://gateway.youleap-local.io/base/table/${tableId}/query/many`,
    headers: { 'content-type': 'application/json', authorization: `Bearer ${accessToken}` },
    data: args,
  };

  try {
    const { data } = await axios.request<CheckSelect<T, Furniture, FurnitureGetPayload<T>>>(options);
    return data;
  } catch (e) {
    throw e;
  }
}

export async function updateManyQueryApi<T extends FurnitureUpdateManyArgs>(
  tableId: string,
  args?: SelectSubset<T, FurnitureUpdateManyArgs>,
): Promise<BatchPayload> {
  const options: AxiosRequestConfig = {
    method: 'PATCH',
    url: `https://gateway.youleap-local.io/base/table/${tableId}/query/many`,
    headers: { 'content-type': 'application/json', authorization: `Bearer ${accessToken}` },
    data: args,
  };

  try {
    const { data } = await axios.request<BatchPayload>(options);
    return data;
  } catch (e) {
    throw e;
  }
}
