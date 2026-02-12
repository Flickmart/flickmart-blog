import { groq } from "next-sanity";

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    author,
    tags,
    "mainImage": mainImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    mainVideo
  }
`;

export const postPathsQuery = groq`
  *[_type == "post" && defined(slug.current)][] {
    "slug": slug.current
  }
`;

export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    readTime,
    author,
    tags,
    "mainImage": mainImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    mainVideo
  }
`;

export const latestPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    author,
    tags,
    "mainImage": mainImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    mainVideo
  }
`;
