import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import type { JSONContent } from "@tiptap/react";
import type { Node } from "@tiptap/pm/model";
import type { ReactNode } from "react";
import { documentExtensions, editorProseClassName } from "../lib/editor-extensions"; // adjust import path to your actual editor route
import { renderHighlightedCodeBlock } from "../lib/render-code-block";
import { BlogCallout } from "./blog-callout";
import type { CalloutVariant } from "../editor-extensions/callout";
import {cn} from "../utils"

export function BlogBody({ content }: { content: JSONContent }) {
  const rendered = renderToReactElement({
    content,
    extensions: documentExtensions,
    options: {

      nodeMapping: {
        codeBlock: ({ node }: { node: Node }) => {
          return (
            <pre className="">
              <code className={`language-ts`}>
                {renderHighlightedCodeBlock(node.textContent, "ts")}
              </code>
            </pre>
          );
        },

        callout: ({
          node,
          children,
        }: {
          node: Node;
          children?: ReactNode | ReactNode[];
        }) => (
          <BlogCallout variant={node.attrs.variant as CalloutVariant}>
            {children}
          </BlogCallout>
        ),
      },
    },

  });

  return <div className={cn("blog-content",editorProseClassName)}>{rendered}</div>;
}