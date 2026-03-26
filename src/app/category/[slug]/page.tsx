import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { getCategories, getProducts } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export default async function CategoryPage({ params }: Props) {
    const { slug } = await params;

    // Получаем все категории и ищем нужную
    const categories = await getCategories();
    const category = categories.find(c => c.slug === slug);

    if (!category) {
        notFound();
    }

    // Получаем товары этой категории
    const allProducts = await getProducts();
    const products = allProducts.filter(p => {
        // Проверяем, относится ли товар к этой категории
        if (p.category) {
            const catId = typeof p.category === 'object' ? p.category.id : p.category;
            return catId === category.id;
        }
        return false;
    });

    // Получаем URL изображения категории
    const imageId = category.image?.id;
    const imageUrl = imageId
        ? `http://localhost:8055/assets/${imageId}?width=800&height=400&fit=cover`
        : null;

    return (
        <main>
            <Header />

            {/* Hero секция категории */}
            <div className="relative h-64 md:h-80 bg-gray-900">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={category.name}
                        className="w-full h-full object-cover opacity-60"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700"></div>
                )}
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            {category.name}
                        </h1>
                        {category.description && (
                            <p className="text-xl max-w-2xl mx-auto px-4">
                                {category.description}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Хлебные крошки */}
            <div className="container mx-auto px-4 py-4">
                <div className="text-sm text-gray-500">
                    <Link href="/" className="hover:text-blue-600">Главная</Link>
                    <span className="mx-2">/</span>
                    <Link href="/catalog" className="hover:text-blue-600">Каталог</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-700">{category.name}</span>
                </div>
            </div>

            {/* Список товаров */}
            <div className="container mx-auto px-4 py-8">
                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            В этой категории пока нет товаров
                        </p>
                        <Link
                            href="/catalog"
                            className="inline-block mt-4 text-blue-600 hover:text-blue-700"
                        >
                            Вернуться в каталог
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="mb-6">
                            <p className="text-gray-600">
                                Найдено товаров: <span className="font-bold text-blue-600">{products.length}</span>
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}