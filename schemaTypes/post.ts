import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  type: "document",
  title: "Blog Post",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      description: "Add a custom slug or generate one from the title",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published At",
      description: "Add a custom date or use the current date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      title: "Excerpt",
      description: "Short description for the blog post",
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: "mainImage",
      type: "image",
      title: "Main Image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "mainVideo",
      type: "videoEmbed",
      title: "Main Video",
      description: "Optional main video for the blog post",
      validation: (Rule) => Rule.optional(),
    }),
    defineField({
      name: "body",
      type: "array",
      title: "Body",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
        { type: "codeBlock" },
        { type: "videoEmbed" },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "readTime",
      type: "string",
      title: "Read Time",
      description: "Estimated reading time (e.g., '5 min read')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      type: "string",
      title: "Author",
      initialValue: "Joseph Ebuka",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author",
      media: "mainImage",
      date: "publishedAt",
    },
    prepare(selection) {
      const { title, author, date } = selection;
      return {
        title,
        subtitle: `by ${author} • ${new Date(date).toLocaleDateString()}`,
        media: selection.media,
      };
    },
  },
  orderings: [
    {
      title: "Publishing Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Publishing Date, Old",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
  ],
});
