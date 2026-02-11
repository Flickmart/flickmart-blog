/** biome-ignore-all lint/suspicious/noExplicitAny: <the types is too complex> */
import type { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  coldarkCold,
  coldarkDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { urlFor } from "@/lib/sanity";
import { AutolinkHeading } from "./autolink-heading";
import { VideoEmbed } from "./video-embed";

export const components = (theme: string): PortableTextComponents => ({
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) {
        return null;
      }

      return (
        <div className="relative z-1 my-4 w-full">
          <Image
            alt={value.alt || "Placeholder image"}
            className="h-auto w-full rounded-lg"
            height={0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            src={urlFor(value).width(1200).quality(90).url()}
            style={{ height: "auto" }}
            width={1200}
          />
          {value.caption && (
            <p className="mt-2 text-center text-muted-foreground text-sm">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    codeBlock: ({ value }: { value: any }) => {
      const highlightLines = value.highlightLines || [];

      return (
        <div className="my-4">
          {value.filename && (
            <div className="rounded-t-md bg-muted px-4 py-2 font-dm text-muted-foreground text-sm">
              {value.filename}
            </div>
          )}
          <SyntaxHighlighter
            className={`syntax-highlighter ${
              value.filename ? "rounded-t-none" : ""
            } rounded-md font-dm`}
            customStyle={{
              fontSize: "0.875em",
              fontFamily: '"DM Mono", monospace',
              marginTop: value.filename ? 0 : undefined,
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
            language={value.code.language || "jsx"}
            lineProps={(lineNumber) => {
              const highlight = highlightLines.includes(lineNumber);
              return {
                className: highlight ? "highlighted-line" : "",
              };
            }}
            showLineNumbers={highlightLines.length > 0}
            style={theme === "dark" ? coldarkDark : coldarkCold}
            wrapLines={true}
          >
            {value.code?.code || ""}
          </SyntaxHighlighter>
        </div>
      );
    },
    videoEmbed: ({ value }: { value: any }) => {
      if (!value?.url) {
        return null;
      }

      return (
        <div className="my-8">
          <VideoEmbed
            autoplay={value.autoplay}
            controls={value.controls}
            loop={value.loop}
            provider={value.provider}
            title={value.title}
            url={value.url}
          />
        </div>
      );
    },
  },
  block: {
    h1: (props: any) => (
      <AutolinkHeading
        className="mt-6 mb-4 font-bold font-futsat text-3xl text-foreground lg:text-4xl"
        level={1}
      >
        {props.children}
      </AutolinkHeading>
    ),
    h2: (props: any) => (
      <AutolinkHeading
        className="mt-6 mb-4 font-bold font-futsat text-2xl text-foreground lg:text-3xl"
        level={2}
      >
        {props.children}
      </AutolinkHeading>
    ),
    h3: (props: any) => (
      <AutolinkHeading
        className="mt-6 mb-4 font-bold font-futsat text-foreground text-xl lg:text-2xl"
        level={3}
      >
        {props.children}
      </AutolinkHeading>
    ),
    h4: (props: any) => (
      <AutolinkHeading
        className="mt-6 mb-4 font-bold font-futsat text-foreground text-lg lg:text-xl"
        level={4}
      >
        {props.children}
      </AutolinkHeading>
    ),
    blockquote: (props: any) => (
      <blockquote className="my-4 rounded-r border-border border-l-[6px] bg-muted p-4 pl-4 text-sm italic dark:border-l-accent">
        {props.children}
      </blockquote>
    ),
    normal: (props: any) => (
      <p className="mb-4 font-switzerRegular text-foreground text-sm leading-relaxed lg:text-base">
        {props.children}
      </p>
    ),
  },
  marks: {
    strong: (props: any) => (
      <strong className="font-bold text-foreground">{props.children}</strong>
    ),
    em: (props: any) => (
      <em className="text-foreground italic">{props.children}</em>
    ),
    code: (props: any) => (
      <code className="rounded bg-muted px-1 py-0.5 font-jetbrains text-foreground text-xs lg:text-sm">
        {props.children}
      </code>
    ),
    link: (props: any) => {
      const href = props.value?.href || "";
      const isExternal = href.startsWith("http");

      return (
        <Link
          className="text-primary underline hover:text-primary/80"
          href={href}
          rel={isExternal ? "noopener noreferrer" : undefined}
          target={isExternal ? "_blank" : undefined}
        >
          {props.children}
        </Link>
      );
    },
  },
  list: {
    bullet: (props: any) => (
      <ul className="space-y-2 text-foreground text-sm">{props.children}</ul>
    ),
    number: (props: any) => (
      <ol className="space-y-2 text-foreground text-sm">{props.children}</ol>
    ),
  },
  listItem: {
    bullet: (props: any) => (
      <li className="font-switzerRegular leading-tight">{props.children}</li>
    ),
    number: (props: any) => (
      <li className="font-switzerRegular leading-tight">{props.children}</li>
    ),
  },
});
