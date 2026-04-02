import { Metadata } from "next";
import { fetchProductDetail } from "@/lib/api";
import ProductDetailClient from "@/features/detail/ProductDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await fetchProductDetail(id);
    return {
      title: `${product.title} | Global Registry`,
      description: product.description.substring(0, 160),
      openGraph: {
        title: product.title,
        description: product.description.substring(0, 160),
        images: [product.thumbnail],
      },
    };
  } catch {
    return { title: "Product Not Found" };
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  return <ProductDetailClient id={id} />;
}
