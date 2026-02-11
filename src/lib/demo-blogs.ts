import type { BlogPost } from "./types";

export const demoBlogs: BlogPost[] = [
  {
    _id: "1",
    _createdAt: "2025-01-15T10:00:00Z",
    title: "UX review presentations",
    slug: "ux-review-presentations",
    excerpt:
      "How to create compelling UX review presentations that communicate your design decisions effectively to stakeholders and get buy-in for your ideas.",
    publishedAt: "2025-01-10T00:00:00Z",
    readTime: "5",
    author: {
      _id: "author-1",
      name: "Olivia Rhye",
    },
    mainImage: {
      _type: "image",
      asset: {
        _ref: "image-1",
        _type: "reference",
        url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=375&fit=crop",
      },
      alt: "UX design review meeting",
    },
    tags: ["Design", "UX", "Presentation"],
  },
  {
    _id: "2",
    _createdAt: "2025-01-14T10:00:00Z",
    title: "Migrating to Linear 101",
    slug: "migrating-to-linear-101",
    excerpt:
      "A comprehensive guide on how to migrate your team's workflow from Jira to Linear. Learn about the benefits, challenges, and step-by-step process.",
    publishedAt: "2025-01-08T00:00:00Z",
    readTime: "8",
    author: {
      _id: "author-2",
      name: "Marcus Chen",
    },
    mainImage: {
      _type: "image",
      asset: {
        _ref: "image-2",
        _type: "reference",
        url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=375&fit=crop",
      },
      alt: "Linear project management interface",
    },
    tags: ["Productivity", "Tools", "Migration"],
  },
  {
    _id: "3",
    _createdAt: "2025-01-13T10:00:00Z",
    title: "The impact of climate change",
    slug: "impact-of-climate-change",
    excerpt:
      "Exploring the latest research on climate change and its effects on global ecosystems, communities, and what we can do to make a difference.",
    publishedAt: "2025-01-05T00:00:00Z",
    readTime: "6",
    author: {
      _id: "author-3",
      name: "Sarah Williams",
    },
    mainImage: {
      _type: "image",
      asset: {
        _ref: "image-3",
        _type: "reference",
        url: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=600&h=375&fit=crop",
      },
      alt: "Climate change visualization",
    },
    tags: ["Environment", "Climate", "Sustainability"],
  },
  {
    _id: "4",
    _createdAt: "2025-01-12T10:00:00Z",
    title: "Building remote teams",
    slug: "building-remote-teams",
    excerpt:
      "Lessons learned from building and managing distributed teams across different time zones. Discover the tools and practices that work best.",
    publishedAt: "2025-01-03T00:00:00Z",
    readTime: "7",
    author: {
      _id: "author-4",
      name: "James Rodriguez",
    },
    mainImage: {
      _type: "image",
      asset: {
        _ref: "image-4",
        _type: "reference",
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=375&fit=crop",
      },
      alt: "Remote team collaboration",
    },
    tags: ["Remote Work", "Team Building", "Management"],
  },
  {
    _id: "5",
    _createdAt: "2025-01-11T10:00:00Z",
    title: "The FlickMart office",
    slug: "flickmart-office-tour",
    excerpt:
      "Take a virtual tour of our new FlickMart headquarters. See how we've designed our space to foster creativity, collaboration, and innovation.",
    publishedAt: "2025-01-01T00:00:00Z",
    readTime: "4",
    author: {
      _id: "author-5",
      name: "Emma Thompson",
    },
    mainImage: {
      _type: "image",
      asset: {
        _ref: "image-5",
        _type: "reference",
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=375&fit=crop",
      },
      alt: "Modern open office space",
    },
    tags: ["Company", "Office", "Culture"],
  },
  {
    _id: "6",
    _createdAt: "2025-01-10T10:00:00Z",
    title: "Design system updates",
    slug: "design-system-updates",
    excerpt:
      "We've completely revamped our design system. Learn about the new components, guidelines, and how it's improving our development workflow.",
    publishedAt: "2024-12-28T00:00:00Z",
    readTime: "5",
    author: {
      _id: "author-6",
      name: "Alex Kim",
    },
    mainImage: {
      _type: "image",
      asset: {
        _ref: "image-6",
        _type: "reference",
        url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=375&fit=crop",
      },
      alt: "Design system components",
    },
    tags: ["Design", "Development", "UI/UX"],
  },
  {
    _id: "7",
    _createdAt: "2025-01-09T10:00:00Z",
    title: "E-commerce trends 2025",
    slug: "ecommerce-trends-2025",
    excerpt:
      "Discover the top e-commerce trends shaping the industry in 2025. From AI-powered recommendations to sustainable shopping practices.",
    publishedAt: "2024-12-25T00:00:00Z",
    readTime: "6",
    author: {
      _id: "author-7",
      name: "Michael Brown",
    },
    mainImage: {
      _type: "image",
      asset: {
        _ref: "image-7",
        _type: "reference",
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=375&fit=crop",
      },
      alt: "Online shopping on laptop",
    },
    tags: ["E-commerce", "Trends", "Retail"],
  },
  {
    _id: "8",
    _createdAt: "2025-01-08T10:00:00Z",
    title: "Customer success stories",
    slug: "customer-success-stories",
    excerpt:
      "Real stories from FlickMart merchants who have grown their businesses using our platform. Learn from their experiences and strategies.",
    publishedAt: "2024-12-22T00:00:00Z",
    readTime: "5",
    author: {
      _id: "author-8",
      name: "Lisa Anderson",
    },
    mainImage: {
      _type: "image",
      asset: {
        _ref: "image-8",
        _type: "reference",
        url: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&h=375&fit=crop",
      },
      alt: "Happy customer with product",
    },
    tags: ["Customers", "Success", "Case Study"],
  },
];
