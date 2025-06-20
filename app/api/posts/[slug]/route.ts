import {posts} from "@/app/data/posts" 
import { BlogPost } from "@/app/types";
import { NextResponse, NextRequest } from "next/server";

type Params = {
    params:{
        slug: string;
    }
}

export async function GET(req: NextRequest, {params}: Params){

    const {slug} = await params;
    const post : BlogPost | undefined = posts.find((post)=> post.slug == slug || post.id == slug);

    if(!post){
        return NextResponse.json({error:"Post not found"}, {status : 404});
    }

    return NextResponse.json(post);
}