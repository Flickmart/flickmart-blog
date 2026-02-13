"use server";

import { latestPostsQuery, postQuery, postsQuery } from "@/lib/queries";
import { client, writeClient } from "@/lib/sanity";
import type { Blog, BlogPost } from "@/lib/types";

export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = await client.fetch(postsQuery);

  return posts.map((post: any) => ({
    _id: post._id,
    title: post.title,
    excerpt: post.excerpt,
    readTime: post.readTime,
    mainImage: post.mainImage,
    mainVideo: post.mainVideo,
    slug: post.slug.current,
    author: post.author,
    publishedAt: post.publishedAt,
    tags: post.tags || [],
  }));
}

export async function getBlogPost(slug: string): Promise<Blog | null> {
  const post = await client.fetch(postQuery, { slug });

  if (!post) {
    return null;
  }

  return {
    _id: post._id,
    title: post.title,
    excerpt: post.excerpt,
    readTime: post.readTime,
    body: post.body,
    mainImage: post.mainImage,
    mainVideo: post.mainVideo,
    slug: post.slug,
    author: post.author,
    publishedAt: post.publishedAt,
    tags: post.tags || [],
  };
}

export async function getLatestPosts(): Promise<BlogPost[]> {
  const posts = await client.fetch(latestPostsQuery);

  return posts.map((post: any) => ({
    _id: post._id,
    title: post.title,
    excerpt: post.excerpt,
    readTime: post.readTime,
    mainImage: post.mainImage,
    mainVideo: post.mainVideo,
    slug: post.slug.current,
    author: post.author,
    publishedAt: post.publishedAt,
    tags: post.tags || [],
  }));
}

export async function getBlogPostPaths(): Promise<string[]> {
  const query = `*[_type == "post" && defined(slug.current)][].slug.current`;
  const slugs = await client.fetch(query);
  return slugs;
}

export async function subscribeToNewsletter(
  prevState: any,
  formData: FormData
) {
  const email = formData.get("email") as string;

  // Email validation
  if (!(email && /^\S+@\S+\.\S+$/.test(email))) {
    return { error: "Valid email required" };
  }

  try {
    // Check for duplicates
    const existing = await client.fetch(
      `*[_type == "subscriber" && email == $email][0]`,
      { email }
    );

    if (existing) {
      return { error: "Already subscribed!" };
    }

    // Create subscriber document
    await writeClient.create({
      _type: "subscriber",
      email,
      source: "blog-post", // Footer subscription
      confirmed: false,
      subscribedAt: new Date().toISOString(),
    });

    return { success: true, message: "Successfully subscribed!" };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return { error: "Subscription failed. Try again." };
  }
}
