import React from 'react'
import { RiStackLine } from 'react-icons/ri'

// Icon components for badges
export const StackIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <RiStackLine {...props} />
)

export const GitHubIcon: React.FC<React.SVGProps<SVGSVGElement> & { theme?: string }> = ({ className, theme, ...props }) => (
  <img
    src={theme === "dark" ? "/github-dark.svg" : "/github-light.svg"}
    alt="GitHub"
    className={className}
    {...(props as any)}
  />
)

export const NotionIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...props }) => (
  <img
    src="/notion.svg"
    alt="Notion"
    className={className}
    {...(props as any)}
  />
)