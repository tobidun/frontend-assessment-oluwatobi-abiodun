import { Metadata } from "next";
import { fetchPostDetail } from "@/lib/api";
import PostDetailClient from "@/features/detail/PostDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const post = await fetchPostDetail(id);
    return {
      title: `${post.title} | Protocol Reports`,
      description: post.body.substring(0, 160),
      openGraph: {
        title: post.title,
        description: post.body.substring(0, 160),
        type: "article",
      },
    };
  } catch {
    return { title: "Report Not Found" };
  }
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  return <PostDetailClient id={id} />;
}
