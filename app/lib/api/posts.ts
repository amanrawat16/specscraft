import { BlogPost } from "@/app/types"
import { apiFetch } from "."

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const getAllPosts = async()=>{
    return await apiFetch<BlogPost[]>(`${BASE_URL}/api/posts`,{
        method:"GET",
        revalidate: 60,
    });
}

export const getPostBySlug = async(slug : string)=>{
    try{
    return await apiFetch<BlogPost | undefined>(`${BASE_URL}/api/posts/${slug}`,{
        method: "GET",
        revalidate: 60,
    });
}catch(error : any){
    if(error.message.includes("404")){
        return undefined;
    }
    throw error;
}

}