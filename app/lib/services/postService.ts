import { posts } from "@/app/data/posts";
import { BlogPost } from "@/app/types";
import { v4 as uuidv4} from "uuid";

export const createPost =(data: Partial<BlogPost>): BlogPost | null =>{

    if (
        !data.title?.trim() ||
        !data.author?.trim() ||
        !data.body?.trim() ||
        !data.slug?.trim()
    ) {
        return null;
    }

    const newPost : BlogPost = {
        id : uuidv4(),
        title: data.title,
        author: data.author,
        body: data.body,
        slug: data.slug,
        coverImage:  data.coverImage && data.coverImage.trim() !== "" ? data.coverImage : "https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/11/how-to-write-a-blog-post.jpeg",
        publishedAt: new Date().toISOString(),
    }

    posts.unshift(newPost);
    
    return newPost;
}