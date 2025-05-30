export async function getFetchApi<T>(url: string): Promise<T> {
    const token = localStorage.getItem("jwtToken");

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        }
    });

    if (!response.ok) {
        throw new Error(`Errore API: ${response.status} ${response.statusText}`);
    }

    return await response.json();
}
