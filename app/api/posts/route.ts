import { posts } from "@/app/data/posts";
import { NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json(posts);
}