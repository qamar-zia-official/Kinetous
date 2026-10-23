import type { blogTable } from "@repo/db/schemas/schema";
import type { ArticleMetaFormValues } from "./article-meta-schema";

export function toBlogInsert(meta: ArticleMetaFormValues, body: string): typeof blogTable.$inferInsert {
  const now = new Date();

  return {
    ...meta,
    body,
    updatedAt: now,
    publishedAt: now,
  };
}