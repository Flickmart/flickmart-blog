import { defineField, defineType } from "sanity";

export default defineType({
  name: "videoEmbed",
  type: "object",
  title: "Video Embed",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "Title for the video (optional)",
    }),
    defineField({
      name: "url",
      type: "url",
      title: "Video URL",
      description: "YouTube, Vimeo, or other supported video URLs",
      // validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "provider",
      type: "string",
      title: "Provider",
      options: {
        list: [
          { title: "YouTube", value: "youtube" },
          { title: "Vimeo", value: "vimeo" },
          { title: "Other", value: "other" },
        ],
      },
      initialValue: "youtube",
    }),
    defineField({
      name: "autoplay",
      type: "boolean",
      title: "Autoplay",
      initialValue: false,
    }),
    defineField({
      name: "controls",
      type: "boolean",
      title: "Show Controls",
      initialValue: true,
    }),
    defineField({
      name: "loop",
      type: "boolean",
      title: "Loop",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      provider: "provider",
      url: "url",
    },
    prepare(selection) {
      const { title, provider, url } = selection;
      return {
        title: title || `${provider} video`,
        subtitle: url,
      };
    },
  },
});
