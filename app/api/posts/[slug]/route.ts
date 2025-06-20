import { prisma } from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

type Params = {
    params:{
        slug: string;
    }
}

export async function GET(req: NextRequest, {params}: Params){
    try {
        const {slug} = await params;
        
        const post = await prisma.post.findFirst({
            where: {
                OR: [
                    { slug: slug },
                    { id: slug }
                ]
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        if(!post){
            return NextResponse.json({error:"Post not found"}, {status : 404});
        }

        // Transform the data to match the expected format
        const transformedPost = {
            id: post.id,
            title: post.title,
            slug: post.slug,
            author: post.author.name || post.author.email || 'Anonymous',
            authorId: post.authorId,
            body: post.body,
            coverImage: post.coverImage,
            publishedAt: post.publishedAt.toISOString(),
        };

        return NextResponse.json(transformedPost);
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json(
            { error: 'Failed to fetch post' },
            { status: 500 }
        );
    }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { slug } = params;

    // Find the post
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    // Check if user is the author or has admin role
    if (post.authorId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: "You can only delete your own posts" },
        { status: 403 }
      );
    }

    // Delete the post
    await prisma.post.delete({
      where: { slug },
    });

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: "Failed to delete post", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}