import Header from "@/components/Header";
import { getProductBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import ProductClient from "./ProductClient";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    // Получаем URL картинки
    const imageId = product.image?.id;
    const imageUrl = imageId
        ? `http://localhost:8055/assets/${imageId}?width=800&height=800&fit=cover`
        : null;

    return (
        <main>
            <Header />
            <ProductClient product={product} />
        </main>
    );
}