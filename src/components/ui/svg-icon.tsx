import type React from "react";
import { RiStackLine } from "react-icons/ri";

// Icon components for badges
export const StackIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <RiStackLine {...props} />
);

export const GitHubIcon: React.FC<
  React.SVGProps<SVGSVGElement> & { theme?: string }
> = ({ className, theme, ...props }) => (
  <img
    alt="GitHub"
    className={className}
    src={theme === "dark" ? "/github-dark.svg" : "/github-light.svg"}
    {...(props as any)}
  />
);

export const NotionIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => (
  <img
    alt="Notion"
    className={className}
    src="/notion.svg"
    {...(props as any)}
  />
);
