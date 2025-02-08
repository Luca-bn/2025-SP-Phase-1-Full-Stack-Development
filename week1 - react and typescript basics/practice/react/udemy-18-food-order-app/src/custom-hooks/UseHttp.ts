import { useCallback, useState } from "react";
import { httpRequestParam } from "../components/utils/Utils";


export default function useHttp<T>() {

    const [sent, setSent] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [data, setData] = useState<T>();

    const httpCall = useCallback(async function httpCall(httpParams: httpRequestParam) {
        setSent(true);
        try {
            const rs: Response = await fetch(httpParams.URL, httpParams.CONFIG);

            if (!rs.ok)
                throw new Error("Error: " + rs.status);

            const json = await rs.json();
            setData(json);
        } catch (error) {
            setError("Error");
            console.log(error);
        }
    }, []);

    const resetHttpState = useCallback(() => {
        setSent(false);
        setError(undefined);
        setData(undefined);
    }, []);

    return {
        sent,
        data,
        error,
        httpCall,
        resetHttpState,
    };
}