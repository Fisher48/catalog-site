"use client";

import { useState } from "react";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";

interface ProductClientProps {
    product: any;
}

export default function ProductClient({ product }: ProductClientProps) {
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);

    const imageId = product.image?.id;
    const imageUrl = imageId
        ? `http://localhost:8055/assets/${imageId}?width=800&height=800&fit=cover`
        : null;

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                {/* Хлебные крошки */}
                <div className="text-sm text-gray-500 mb-6">
                    <Link href="/" className="hover:text-blue-600">Главная</Link>
                    <span className="mx-2">/</span>
                    <Link href="/catalog" className="hover:text-blue-600">Каталог</Link>
                    {product.category && (
                        <>
                            <span className="mx-2">/</span>
                            <Link
                                href={`/catalog?category=${product.category.slug}`}
                                className="hover:text-blue-600"
                            >
                                {product.category.name}
                            </Link>
                        </>
                    )}
                    <span className="mx-2">/</span>
                    <span className="text-gray-700">{product.name}</span>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg border p-4">
                        <div className="aspect-square relative">
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded">
                                    <span className="text-gray-400">Нет фото</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                        {product.article && (
                            <p className="text-gray-500 mb-4">Артикул: {product.article}</p>
                        )}

                        {product.price ? (
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-blue-600">
                                    {product.price.toLocaleString()} ₽
                                </span>
                                {product.old_price && (
                                    <span className="ml-4 text-lg text-gray-400 line-through">
                                        {product.old_price.toLocaleString()} ₽
                                    </span>
                                )}
                            </div>
                        ) : (
                            <div className="mb-6">
                                <span className="text-2xl text-gray-500">Цена по запросу</span>
                            </div>
                        )}

                        <div className="mb-6">
                            {product.in_stock ? (
                                <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full">
                                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                                    В наличии
                                </span>
                            ) : (
                                <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                                    <span className="w-2 h-2 bg-yellow-600 rounded-full mr-2"></span>
                                    Под заказ
                                </span>
                            )}
                        </div>

                        {product.description && (
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-3">Описание</h2>
                                <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
                            </div>
                        )}

                        {product.specifications && (
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-3">Характеристики</h2>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    {Object.entries(product.specifications).map(([key, value]) => (
                                        <div key={key} className="flex py-2 border-b last:border-0">
                                            <span className="w-1/3 text-gray-600">{key}:</span>
                                            <span className="w-2/3 font-medium">{String(value)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => setIsQuoteOpen(true)}
                            className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
                        >
                            Запросить цену
                        </button>

                        <p className="text-sm text-gray-500 mt-4 text-center">
                            Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                        </p>
                    </div>
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