import axios from "./axios";
import { AxiosRequestConfig, AxiosError } from "axios";

/**
 * Makes a GET request to the specified URL and returns the response data.
 * @param url - The URL to make the GET request to.
 * @param config - Optional Axios request configuration.
 * @returns A Promise that resolves to the response data.
 * @throws An error if the request fails.
 */
export const getRequest = async <TResponse>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<TResponse> => {
  try {
    const response = await axios.get<TResponse>(url, config);
    return response.data;
  } catch (error) {
    console.log("catch from getRequest", error);
    const message = (error as AxiosError<{ message: string }>).response?.data
      ?.message;
    //notification(`Error while fetching ${url}. ${message ?? ''}`, 'error');
    throw error; // need to throw or onError will fail
  }
};

/**
 * Sends a POST request to the specified URL with the given data and configuration.
 * @template TRequest The type of the request data.
 * @template TResponse The type of the response data.
 * @param {string} url The URL to send the request to.
 * @param {TRequest} data The data to send with the request.
 * @param {AxiosRequestConfig} [config] The configuration for the request.
 * @returns {Promise<TResponse>} A promise that resolves with the response data.
 * @throws {AxiosError} If the request fails.
 */

export const postRequest = async <TRequest, TResponse>(
  url: string,
  data: TRequest,
  config?: AxiosRequestConfig,
): Promise<TResponse> => {
  try {
    const response = await axios.post<TResponse>(url, data, config);
    return response.data;
  } catch (error) {
    console.log("catch from postRequest", error);
    const message = (error as AxiosError<{ message: string }>).response?.data
      ?.message;
    // notification(`Error while posting ${url}. ${message ?? ''}`, 'error');
    throw error; // need to throw or onError will fail
  }
};

/**
 * Sends a PUT request to the specified URL with the provided data and configuration.
 * @template TRequest The type of the request data.
 * @template TResponse The type of the response data.
 * @param {string} url The URL to send the request to.
 * @param {TRequest} data The data to send with the request.
 * @param {AxiosRequestConfig} [config] The configuration for the request.
 * @returns {Promise<TResponse>} A promise that resolves with the response data.
 * @throws {AxiosError} If the request fails.
 */
export const putRequest = async <TRequest, TResponse>(
  url: string,
  data: TRequest,
  config?: AxiosRequestConfig,
): Promise<TResponse> => {
  try {
    const response = await axios.put<TResponse>(url, data, config);
    return response.data;
  } catch (error) {
    console.log("catch from putRequest", error);
    const message = (error as AxiosError<{ message: string }>).response?.data
      ?.message;
    //notification(`Error while updating ${url}. ${message ?? ""}`, "error");
    throw error;
  }
};

/**
 * Sends a DELETE request to the specified URL using axiosInstance.
 * @template TResponse The expected response type.
 * @param {string} url The URL to send the request to.
 * @param {AxiosRequestConfig} [config] The optional request configuration.
 * @returns {Promise<TResponse>} A promise that resolves with the response data.
 * @throws {AxiosError} If the request fails.
 */
export const deleteRequest = async <TResponse>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<TResponse> => {
  try {
    const response = await axios.delete<TResponse>(url, config);
    return response.data;
  } catch (error) {
    console.log("catch from deleteRequest", error);
    const message = (error as AxiosError<{ message: string }>).response?.data
      ?.message;
    //notification(`Error while deleting ${url}. ${message ?? ''}`, 'error');
    throw error;
  }
};
