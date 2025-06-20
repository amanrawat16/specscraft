import { createPost } from "@/app/lib/services/postService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){

    const body = await req.json();
    const result = createPost(body);

    if(!result){
        return NextResponse.json({error: "Validation Failed"}, {status: 400})
    }

    return NextResponse.json(result, { status : 201});
}