import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();
    
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
    
    // Log specific database connection errors
    if (error instanceof Error) {
      if (error.message.includes('P1001') || error.message.includes('connect')) {
        console.error('Database connection failed:', error.message);
        return NextResponse.json(
          { error: 'Database connection failed. Please check your DATABASE_URL configuration.' },
          { status: 500 }
        );
      }
      
      if (error.message.includes('Record to find does not exist')) {
        return NextResponse.json([]);
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}