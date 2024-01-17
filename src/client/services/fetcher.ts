
type method_types = "GET" | "POST" | "PUT" | "DELETE";

export const TOKEN_KEY = "token";

interface RequestInfo {
    method: method_types;
    headers: HeadersInit;
    body?: any;
}

export const fetcher = <T = any>(url: string, method: method_types = "GET", data?: unknown) => {
    return new Promise<T>(async (resolve, reject) => {
        try {
            const headers: HeadersInit = {};

            const fetchOptions: RequestInfo = {
                method: method,
                headers,
                body: data ? JSON.stringify(data) : undefined,
            };

            const token = localStorage.getItem(TOKEN_KEY);
            

            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            if (method !== "GET" && method !== "DELETE") {
                headers["Content-Type"] = "application/json";
            }

            const SERVER_URL = process.env.SERVER_URL;
            const res = await fetch(SERVER_URL + url, fetchOptions);
            const resData = await res.json();

            if (res.ok) {
                resolve(resData);
            } else {
                throw new Error(resData.message);
            }
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};
