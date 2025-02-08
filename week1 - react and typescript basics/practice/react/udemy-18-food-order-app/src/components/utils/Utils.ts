const backendBaseUrl = "http://localhost:3000";

export type httpRequestParam = {
    URL: string;
    CONFIG?: RequestInit | {};
}

export const HTTP_CONFIGS = {
    BACKEND_BASE_PATH: backendBaseUrl,

    GET_MEALS_PARAMS: (): httpRequestParam => {
        return {
            URL: backendBaseUrl + "/meals",
            CONFIG: {}
        }
    },

    POST_ORDER_PARAMS: (body: unknown): httpRequestParam => {
        return {
            URL: backendBaseUrl + "/orders",
            CONFIG: {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body
            }
        }
    }
}

export const formatPrice = (price: number) => {
    return Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
    }).format(price)
}