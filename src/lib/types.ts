/** biome-ignore-all lint/suspicious/noExplicitAny: <the type is not known> */
export interface SanityImage {
  asset: {
    _id: string;
    url: string;
  };
  alt: string;
}

export interface MainVideo {
  url: string;
  title?: string;
  thumbnail?: SanityImage;
  provider?: "youtube" | "vimeo" | "other";
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
}

export interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  readTime: string;
  body?: any;
  mainImage?: SanityImage;
  mainVideo?: MainVideo;
  slug: {
    current: string;
  };
  author: string;
  publishedAt: string;
  tags?: string[];
}

// Simplified blog interface for listing
export interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  readTime: string;
  mainImage?: SanityImage;
  mainVideo?: MainVideo;
  slug: string;
  author: string;
  publishedAt: string;
  tags?: string[];
}

// Legacy Blog interface for backward compatibility
export interface LegacyBlog {
  id: string | number;
  title: string;
  description: string;
  readTime: string;
  content: any;
  url: string;
  slug: string;
  author: string;
  publishedDate: string;
  updatedAt: string;
  createdAt: string;
  tags: Array<{
    id?: string;
    tag: string;
  }>;
  alt: string;
}

export interface BlogResponse {
  docs: LegacyBlog[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: number;
  nextPage?: number;
}
