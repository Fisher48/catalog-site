"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Eye } from "lucide-react";
import QuoteForm from "./QuoteForm";

interface ProductCardProps {
    product: {
        id: number;
        name: string;
        slug: string;
        price?: number | null;
        description?: string | null;
        image?: {
            id: string;
        };
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    const [imageError, setImageError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);

    const imageId = product.image?.id;
    const imageUrl = imageId && !imageError
        ? `http://localhost:8055/assets/${imageId}?width=400&height=400&fit=cover`
        : null;

    return (
        <>
            <div className="product-card bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={product.name}
                            className="product-image w-full h-full object-cover"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            Нет фото
                        </div>
                    )}

                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Хит
                    </div>

                    <div className={`absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-2 transition-opacity duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                        <Link
                            href={`/product/${product.slug}`}
                            className="bg-white p-3 rounded-full hover:bg-blue-600 hover:text-white transition"
                        >
                            <Eye size={20} />
                        </Link>
                        <button
                            onClick={() => setIsQuoteOpen(true)}
                            className="bg-white p-3 rounded-full hover:bg-blue-600 hover:text-white transition"
                        >
                            <ShoppingCart size={20} />
                        </button>
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600 transition">
                        <Link href={`/product/${product.slug}`}>
                            {product.name}
                        </Link>
                    </h3>

                    {product.price ? (
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-2xl font-bold text-blue-600">
                                    {product.price.toLocaleString()} ₽
                                </span>
                                <span className="text-sm text-gray-400 ml-2">/шт</span>
                            </div>
                            <span className="text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded">
                                В наличии
                            </span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500">Цена по запросу</span>
                            <span className="text-yellow-600 text-sm font-medium bg-yellow-50 px-2 py-1 rounded">
                                Под заказ
                            </span>
                        </div>
                    )}

                    <button
                        onClick={() => setIsQuoteOpen(true)}
                        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Запросить цену
                    </button>
                </div>
            </div>

            <QuoteForm
                isOpen={isQuoteOpen}
                onClose={() => setIsQuoteOpen(false)}
                productId={product.id}
                productName={product.name}
            />
        </>
    );
}