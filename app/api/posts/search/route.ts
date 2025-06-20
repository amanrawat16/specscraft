import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get('keyword') || '';
    const author = searchParams.get('author') || '';
    const sortBy = searchParams.get('sortBy') || 'newest';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    // Build where clause for filtering
    const where: any = {};

    if (keyword) {
      where.OR = [
        { title: { contains: keyword, mode: 'insensitive' } },
        { body: { contains: keyword, mode: 'insensitive' } },
      ];
    }

    if (author) {
      where.author = { name: { contains: author, mode: 'insensitive' } };
    }

    // Build orderBy clause for sorting
    let orderBy: any = {};
    switch (sortBy) {
      case 'oldest':
        orderBy.publishedAt = 'asc';
        break;
      case 'title':
        orderBy.title = 'asc';
        break;
      case 'newest':
      default:
        orderBy.publishedAt = 'desc';
        break;
    }

    // Get total count for pagination
    const total = await prisma.post.count({ where });

    // Get posts with pagination
    const posts = await prisma.post.findMany({
      where,
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy,
      skip: offset,
      take: limit,
    });

    // Transform the response
    const transformedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      body: post.body,
      coverImage: post.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop',
      publishedAt: post.publishedAt.toISOString(),
      author: post.author.name || post.author.email || 'Anonymous',
      authorId: post.authorId,
    }));

    return NextResponse.json({
      posts: transformedPosts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      filters: {
        keyword,
        author,
        sortBy,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to search posts" },
      { status: 500 }
    );
  }
} 