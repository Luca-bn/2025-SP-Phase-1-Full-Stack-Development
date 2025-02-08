import { useCallback, useState } from "react";


export default function useHttp() {

    const [ sent, setSent ] = useState(false);
    const [ error, setError ] = useState();
    const [ data, setData ] = useState();

    const httpCall = useCallback(async function httpCall(httpParams) {
        setSent(true);
        try {
            const rs = await fetch(httpParams.URL, httpParams.CONFIG);
            
            if(!rs.ok)
                throw new Error(rs.status);

            const json = await rs.json();
            setData(json);
        } catch (error) {
            setError("Error");
            console.log(error);
        }
    });

    const resetHttpState = useCallback(() => {
        setSent(false);
        setError(undefined);
        setData(undefined);
    });

    return {
        sent,
        data,
        error,
        httpCall,
        resetHttpState,
    };
}