import { posts } from "@/app/data/posts";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, {params} : {params : {id: string}}){

    const {id}  = params;

    const index = posts.findIndex((p) => p.id === id);

    if( index === -1){
        return NextResponse.json({error:"Post not found"}, {status: 404});
    }

    const data = await req.json();

    const { title, author, slug, coverImage, body } = data;

    if (!title || !author || !slug || !body) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    posts[index] = {
    ...posts[index],
    title,
    author,
    slug,
    coverImage,
    body,
    publishedAt: new Date().toISOString(),
    };

    return NextResponse.json(posts[index]);

}