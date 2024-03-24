import { useEffect, useState } from "react"

export const useFetch = (url) => {

    const [ data, setData ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    useEffect( () => {
        setLoading(true)
        fetch(url)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }, [url])
    
    return [ data, loading, error ]
}