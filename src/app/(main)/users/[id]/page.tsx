import { Metadata } from "next";
import { fetchUserDetail } from "@/lib/api";
import UserDetailClient from "@/features/detail/UserDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const user = await fetchUserDetail(id);
    return {
      title: `${user.firstName} ${user.lastName} | Agent Directory`,
      description: `Protocol Profile for Agent ${user.firstName} ${user.lastName}. Role: ${user.company?.title || "Operational Agent"}.`,
    };
  } catch {
    return { title: "Agent Profile Not Found" };
  }
}

export default async function UserPage({ params }: Props) {
  const { id } = await params;
  return <UserDetailClient id={id} />;
}
