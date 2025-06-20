import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
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
    const data = await req.json();
    const { title, author, slug: newSlug, coverImage, body: postBody } = data;

    // Validation
    if (!title || !newSlug || !postBody) {
      return NextResponse.json(
        { error: "Title, slug, and body are required" },
        { status: 400 }
      );
    }

    // Find the post by current slug
    const existingPost = await prisma.post.findUnique({
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

    if (!existingPost) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    // Check if user is the author or admin
    if (existingPost.authorId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "You don't have permission to edit this post" },
        { status: 403 }
      );
    }

    // Check if new slug conflicts with another post
    if (newSlug !== existingPost.slug) {
      const slugConflict = await prisma.post.findUnique({
        where: { slug: newSlug },
      });

      if (slugConflict) {
        return NextResponse.json(
          { error: "A post with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // Update the post
    const updatedPost = await prisma.post.update({
      where: { id: existingPost.id },
      data: {
        title,
        slug: newSlug,
        body: postBody,
        coverImage: coverImage || null,
        updatedAt: new Date(),
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
      id: updatedPost.id,
      title: updatedPost.title,
      slug: updatedPost.slug,
      author: updatedPost.author.name || updatedPost.author.email || 'Anonymous',
      authorId: updatedPost.authorId,
      body: updatedPost.body,
      coverImage: updatedPost.coverImage,
      publishedAt: updatedPost.publishedAt.toISOString(),
    };

    return NextResponse.json(transformedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}