"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
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
            <motion.div
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
            >
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                    {imageUrl ? (
                        <motion.img
                            src={imageUrl}
                            alt={product.name}
                            className="product-image w-full h-full object-cover"
                            onError={() => setImageError(true)}
                            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            Нет фото
                        </div>
                    )}

                    <div className="absolute top-3 left-3 bg-[#C2A46D] text-[#0B1F3A] text-xs font-bold px-2 py-1 rounded">
                        Хит
                    </div>

                    <motion.div
                        className={`absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-2`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Link
                                href={`/product/${product.slug}`}
                                className="bg-white p-3 rounded-full hover:bg-[#C2A46D] hover:text-white transition"
                            >
                                <Eye size={20} />
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <button
                                onClick={() => setIsQuoteOpen(true)}
                                className="bg-white p-3 rounded-full hover:bg-[#C2A46D] hover:text-white transition"
                            >
                                <ShoppingCart size={20} />
                            </button>
                        </motion.div>
                    </motion.div>
                </div>

                <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-[#C2A46D] transition">
                        <Link href={`/product/${product.slug}`}>
                            {product.name}
                        </Link>
                    </h3>

                    {product.price ? (
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-2xl font-bold text-[#0B1F3A]">
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

                    <motion.button
                        onClick={() => setIsQuoteOpen(true)}
                        className="w-full mt-4 bg-[#0B1F3A] text-white py-2 rounded-lg hover:bg-[#C2A46D] hover:text-[#0B1F3A] transition"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Запросить цену
                    </motion.button>
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