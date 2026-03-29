"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Eye } from "lucide-react";
import QuoteForm from "./QuoteForm";

interface ProductCardHorizontalProps {
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

export default function ProductCardHorizontal({ product }: ProductCardHorizontalProps) {
    const [imageError, setImageError] = useState(false);
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);

    const imageId = product.image?.id;
    const imageUrl = imageId && !imageError
        ? `http://localhost:8055/assets/${imageId}?width=120&height=120&fit=cover`
        : null;

    return (
        <>
            <motion.div
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -2 }}
            >
                <div className="flex gap-4 p-4">
                    {/* Фото */}
                    <motion.div
                        className="w-24 h-24 flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover rounded-lg"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                                <span className="text-gray-400 text-xs">Нет фото</span>
                            </div>
                        )}
                    </motion.div>

                    {/* Информация */}
                    <div className="flex-1">
                        <Link href={`/product/${product.slug}`}>
                            <motion.h3
                                className="font-semibold text-base hover:text-[#C2A46D] transition line-clamp-1"
                                whileHover={{ x: 2 }}
                            >
                                {product.name}
                            </motion.h3>
                        </Link>

                        {product.description && (
                            <motion.p
                                className="text-sm text-gray-500 mt-1 line-clamp-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                {product.description}
                            </motion.p>
                        )}

                        <div className="flex items-center justify-between mt-3">
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                {product.price ? (
                                    <span className="text-xl font-bold text-[#0B1F3A]">
                                        {product.price.toLocaleString()} ₽
                                    </span>
                                ) : (
                                    <span className="text-sm text-gray-500">Цена по запросу</span>
                                )}
                            </motion.div>

                            <div className="flex gap-1">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Link
                                        href={`/product/${product.slug}`}
                                        className="flex items-center gap-1 px-2 py-1.5 rounded-lg border
                                        border-gray-200 hover:border-[#C2A46D] hover:text-[#C2A46D] transition text-x"
                                    >
                                        <Eye size={20} />
                                        <span className="hidden sm:inline">Просмотр</span>
                                    </Link>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <button
                                        onClick={() => setIsQuoteOpen(true)}
                                        className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-[#0B1F3A]
                                        text-white hover:bg-[#C2A46D] hover:text-[#0B1F3A] transition text-s"
                                    >
                                        <ShoppingCart size={20} />
                                        <span className="hidden sm:inline">Запросить</span>
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <QuoteForm
                isOpen={isQuoteOpen}
                onClose={() => setIsQuoteOpen(false)}
                productId={product.id}
                productName={product.name}
            />
        </>
    );
}