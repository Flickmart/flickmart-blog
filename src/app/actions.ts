"use server";

import { latestPostsQuery, postQuery, postsQuery } from "@/lib/queries";
import { client, urlFor } from "@/lib/sanity";
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

  if (!post) return null;

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
