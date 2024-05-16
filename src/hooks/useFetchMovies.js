import { useState, useEffect } from 'react';

const useFetchMovies = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: { accept: 'application/json', Authorization: `Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}` }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                const result = await response.json();
                setData(result);
                setIsLoading(false);
                console.log(result);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [url]);

    return { data, isLoading, error };
};

export default useFetchMovies;