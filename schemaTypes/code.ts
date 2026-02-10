import { defineField, defineType } from "sanity";

export default defineType({
  name: "codeBlock",
  type: "object",
  title: "Code Block",
  fields: [
    defineField({
      name: "filename",
      type: "string",
      title: "Filename",
      description: "Optional filename to display above the code block",
    }),
    defineField({
      name: "code",
      type: "code",
      title: "Code",
      description: "The code to display",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "highlightLines",
      type: "array",
      title: "Highlight Lines",
      description: "Line numbers to highlight (e.g., 1, 3, 5-7)",
      of: [{ type: "number" }],
      options: {
        layout: "tags",
      },
    }),
  ],
  preview: {
    select: {
      code: "code",
      language: "language",
      filename: "filename",
    },
    prepare({ code, language, filename }) {
      const title = filename || `${language || "Code"} Block`;
      const subtitle = `${code.language} ${code.code}`;
      return {
        title,
        subtitle,
      };
    },
  },
});
