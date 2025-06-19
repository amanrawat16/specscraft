import { BlockRenderer } from "@/app/components/ui/BlockRenderer";
import { ReactNode } from "react";
import ReactMarkdown from "react-markdown"

export function parseBlock(content: string): ReactNode[] {
  const blockRegex = /{{block\s+([^}]+)}}/g;
  const elements: ReactNode[] = [];

  let lastIndex = 0;
  let match;

  while ((match = blockRegex.exec(content)) !== null) {
    const [fullMatch, paramsString] = match;
    const index = match.index;

    if (index > lastIndex) {
      const plainText = content.slice(lastIndex, index).trim();
      if (plainText) {
        elements.push(
            <div key={`md-${lastIndex}`} className="prose dark:prose-invert">
          <ReactMarkdown>
            {plainText}
          </ReactMarkdown>
            </div>
        );
      }
    }

    const params = Object.fromEntries(
      [...paramsString.matchAll(/(\w+)="([^"]+)"/g)].map(([, key, value]) => [key, value])
    );

    // Push the block renderer
    elements.push(<BlockRenderer key={`block-${index}`} {...(params as {name : string})} />);

    lastIndex = index + fullMatch.length;
  }

  // Add any remaining plain text after the last block
  if (lastIndex < content.length) {
    const plainText = content.slice(lastIndex).trim();
    if (plainText) {
      elements.push(
        <div key={`md-${lastIndex}`} className="prose dark:prose-invert">
        <ReactMarkdown>
          {plainText}
        </ReactMarkdown>
        </div>
      );
    }
  }

  return elements;
}