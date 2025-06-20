import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
    });

    // Transform the data to match the expected format
    const transformedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      author: post.author.name || post.author.email || 'Anonymous',
      authorId: post.authorId,
      body: post.body,
      coverImage: post.coverImage,
      publishedAt: post.publishedAt.toISOString(),
    }));

    return NextResponse.json(transformedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    
    // Return empty array instead of error if no posts found
    if (error instanceof Error && error.message.includes('Record to find does not exist')) {
      return NextResponse.json([]);
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}