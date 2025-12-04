import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

// Central fetch helper matching svastha pattern
// This is the main API request function used throughout the application

let axiosInstance: AxiosInstance | null = null;
let apiQueue: Array<{
  url: string;
  method: string;
  cancelTokenSource: any;
}> = [];

const CancelToken = axios.CancelToken;

const API = (force = false): AxiosInstance => {
  if (axiosInstance && !force) {
    return axiosInstance;
  }

  axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT || process.env.NEXT_API_ENDPOINT,
  });

  return axiosInstance;
};

export interface FetchOptionsProps {
  method?: AxiosRequestConfig["method"] | string;
  body?: any;
  headers?: AxiosRequestConfig["headers"];
  queryParams?: AxiosRequestConfig["params"];
  cache?: boolean;
  cacheTTL?: number; // in seconds
  cacheSegment?: string;
}

const generateQueryString = (queryObject: any) => {
  let queryString = "";
  if (queryObject) {
    const queryKeys = Object.keys(queryObject);
    queryKeys.forEach((key) => {
      if (queryObject[key]) {
        if (queryObject[key].toString().length) {
          queryString += `${key}=${JSON.stringify(queryObject[key])}&`;
        }
      }
    });
    if (queryKeys.length > 0 && queryString[queryString.length - 1] === "&") {
      queryString = queryString.slice(0, -1);
    }
  }
  return queryString;
};

export const fetch: (url: string, options?: FetchOptionsProps) => any = async (
  url,
  options = {}
) => {
  const {
    method = "GET",
    body = {},
    headers = {},
    cache = false,
    cacheTTL,
    cacheSegment,
  } = options;
  const { queryParams = {} } = options;

  // TODO: Implement caching logic similar to svastha if needed
  // For now, we'll skip caching implementation

  let queueUrl: string;
  if (url.indexOf("http") !== -1) {
    queueUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT || process.env.NEXT_API_ENDPOINT}${url}`;
  } else {
    queueUrl = `${url}`;
  }

  if (queryParams) {
    const tempQueryParams = JSON.parse(JSON.stringify(queryParams || {}));
    if (tempQueryParams?.filter) {
      delete tempQueryParams.filter;
    }
    const queryString = generateQueryString(tempQueryParams);
    if (queryString) {
      queueUrl = `${queueUrl}?${queryString}`;
    }
  }

  const queueObject = {
    url: queueUrl,
    method: String(method).toLowerCase(),
    cancelTokenSource: null as any,
  };

  let cancelToken: any = null;

  if (typeof window !== "undefined") {
    queueObject.cancelTokenSource = CancelToken.source();
    cancelToken = queueObject.cancelTokenSource.token;

    // Cancel any in-flight GET with the same URL
    apiQueue.forEach((aq) => {
      if (
        aq.url !== "/customer" &&
        aq.url === queueUrl &&
        aq.method === "get"
      ) {
        aq.cancelTokenSource?.cancel();
      }
    });

    apiQueue.push(queueObject);
  }

  try {
    const response = await API().request({
      method,
      url,
      headers,
      data: body,
      params: queryParams,
      cancelToken,
    });

    const res = response.data;

    if (typeof window !== "undefined") {
      apiQueue = apiQueue.filter(
        (aq) =>
          !(
            aq.url === queueUrl &&
            aq.method === String(method).toLowerCase() &&
            String(method).toLowerCase() === "get"
          )
      );
    }

    // TODO: Implement caching if cache is true
    // if (cache) { ... }

    return res;
  } catch (e: any) {
    if (typeof window !== "undefined") {
      apiQueue = apiQueue.filter(
        (aq) => !(aq.url === url && aq.method === String(method).toLowerCase() && String(method).toLowerCase() === "get")
      );
    }
    
    // Mirror svastha's error handling exactly (from svastha/src/libs/helpers.tsx lines 226-230)
    // First check for wrapped error format: e.error.response.data.message (svastha's expected format)
    if (e?.error?.response && e?.error?.response?.data && e?.error?.response?.data?.message) {
      throw new Error(e.error.response.data.message || "Bad response from server");
    } 
    // Handle direct axios errors (when axios throws directly, not wrapped)
    // Axios errors have e.response structure
    else if (e?.response) {
      // Check response.data.message first (backend error message)
      if (e.response.data?.message) {
        throw new Error(e.response.data.message || "Bad response from server");
      }
      // Check response.data.error (alternative error format)
      else if (e.response.data?.error) {
        const errorMsg = typeof e.response.data.error === "string" 
          ? e.response.data.error 
          : e.response.data.error?.message || "Bad response from server";
        throw new Error(errorMsg);
      }
      // If no message in response, use status text or default
      else {
        const statusText = e.response.statusText || `Request failed with status code ${e.response.status}`;
        throw new Error(statusText);
      }
    }
    // Fallback: check for error.message (svastha pattern)
    else {
      throw new Error(e?.error?.message || e?.message || "Bad response from server");
    }
  }
};

export { API };

