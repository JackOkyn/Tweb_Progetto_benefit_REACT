
//GET METHOD
export async function getFetchApi<T>(url: string): Promise<T> {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        // Se non è 200-299
        throw new Error(`Errore API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data as T;
}
