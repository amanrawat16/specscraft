export type HTTPMethod = "GET" | "PUT" | "POST" | "PATCH" | "DELETE";

interface ApiOptions extends Omit<RequestInit, "body"> {
    method?: HTTPMethod;
    revalidate?: number; 
    body?: BodyInit | object | null;
}

export async function apiFetch<T>(url: string,options : ApiOptions = {}): Promise<T>{

    const {method="GET",body,headers,revalidate, ...rest} = options;

    const res = await fetch(url,{
        method,
        headers:{
            "Content-Type":"application/json",
            ...headers
        },
        body: body && typeof body === "object" ? JSON.stringify(body) : body,
        cache : revalidate ? "force-cache" : "no-store",
        next : revalidate ? { revalidate } : undefined,
        ...rest,
    });

    if(!res.ok){
        const errorText = await res.text();
        throw new Error(`API Error (${res.status}): ${errorText}`);
    }

    return res.json();
}

