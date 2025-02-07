const backendBaseUrl = "http://localhost:3000";

export const HTTP_CONFIGS = {
    BACKEND_BASE_PATH: backendBaseUrl,

    GET_MEALS_PARAMS: () => {
        return {
            URL: backendBaseUrl + "/meals",
            CONFIG: {}
        }
    },

    POST_ORDER_PARAMS: (body) => {
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

export const formatPrice = (price) => {
    return  Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
      }).format(price)
}