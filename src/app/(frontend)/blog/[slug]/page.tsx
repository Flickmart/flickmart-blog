import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPostPaths } from "@/app/actions";
import { BlogPostClient } from "@/components/blog-post-client";
import { urlFor } from "@/lib/sanity";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getBlogPostPaths();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.mainImage
        ? [urlFor(post.mainImage).width(1200).height(630).url()]
        : [],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
