import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

const DEFAULT_COVER_IMAGE = "https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/11/how-to-write-a-blog-post.jpeg";

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await req.json();
    console.log('Create post - received data:', body);
    
    const { title, author, slug, coverImage, body: postBody } = body;

    console.log('Create post - extracted fields:', { title, author, slug, coverImage, hasBody: !!postBody });

    // Validation
    if (!title || !slug || !postBody) {
      console.log('Create post - validation failed:', { title: !!title, slug: !!slug, body: !!postBody });
      return NextResponse.json(
        { error: "Title, slug, and body are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingPost = await prisma.post.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 400 }
      );
    }

    // Create the post with default cover image if none provided
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        body: postBody,
        coverImage: coverImage || DEFAULT_COVER_IMAGE,
        authorId: session.user.id,
        publishedAt: new Date(),
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Transform the response
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

    return NextResponse.json(transformedPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: "Failed to create post", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}