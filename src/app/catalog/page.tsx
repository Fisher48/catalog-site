"use client";

import Header from "@/components/Header";
import { getProducts, getCategories } from "@/lib/api";
import { Filter, Search } from "lucide-react";
import Link from "next/link";
import { buildCategoryTree } from "@/lib/categoryTree";
import ProductCardHorizontal from "@/components/ProductCardHorizontal";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CatalogPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [rootCategories, setRootCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await getProducts();
                const categoriesData = await getCategories();
                const tree = buildCategoryTree(categoriesData);
                setProducts(productsData);
                setRootCategories(tree);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Анимации
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const fadeInLeft = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    };

    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    const productItem = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    const categoryItem = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
    };

    if (loading) {
        return (
            <main>
                <Header />
                <div className="container mx-auto px-4 py-8 text-center">
                    <div className="spinner mx-auto"></div>
                    <p className="mt-4 text-gray-500">Загрузка...</p>
                </div>
            </main>
        );
    }

    return (
        <main>
            <Header />

            {/* Заголовок */}
            <motion.section
                className="text-white py-12"
                style={{
                    background: "linear-gradient(135deg, #0B1F3A 0%, rgba(194, 164, 109, 0.8) 100%)"
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="container mx-auto px-8">
                    <motion.h1
                        className="text-4xl font-bold mb-2"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Каталог продукции
                    </motion.h1>
                    <motion.p
                        className="text-gray-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        Более {products.length} наименований запорной арматуры в наличии
                    </motion.p>
                </div>
            </motion.section>

            {/* Основной контент */}
            <div className="container mx-auto px-4 py-8">
                {/* Блок корневых категорий (карточки) */}
                {rootCategories.length > 0 && (
                    <motion.div
                        className="mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.h2
                            className="text-2xl font-bold mb-6 text-brand-dark"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            Категории
                        </motion.h2>
                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
                            variants={staggerChildren}
                            initial="hidden"
                            animate="visible"
                        >
                            {rootCategories.map((cat) => {
                                const imageId = (cat.image as any)?.id;
                                const imageUrl = imageId
                                    ? `http://localhost:8055/assets/${imageId}?width=400&height=400&fit=cover`
                                    : null;

                                return (
                                    <motion.div
                                        key={cat.id}
                                        variants={categoryItem}
                                        whileHover={{ y: -5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Link
                                            href={`/category/${cat.slug}`}
                                            className="group block"
                                        >
                                            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
                                                <div className="aspect-square bg-gray-100 overflow-hidden">
                                                    {imageUrl ? (
                                                        <motion.img
                                                            src={imageUrl}
                                                            alt={cat.name}
                                                            className="w-full h-full object-cover"
                                                            whileHover={{ scale: 1.1 }}
                                                            transition={{ duration: 0.3 }}
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                            📁
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-3 text-center">
                                                    <h3 className="font-medium text-gray-800 group-hover:text-brand-gold transition">
                                                        {cat.name}
                                                    </h3>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        {getProductCountInCategory(products, cat)} товаров
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Боковая панель с фильтрами */}
                    <motion.aside
                        className="lg:w-64 flex-shrink-0"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-semibold text-lg flex items-center text-brand-dark">
                                    <Filter size={20} className="mr-2" />
                                    Фильтры
                                </h2>
                                <button className="text-sm text-brand-gold hover:text-brand-gold/80">
                                    Сбросить
                                </button>
                            </div>

                            {/* Поиск */}
                            <div className="mb-6">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Поиск товаров..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                    />
                                    <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                                </div>
                            </div>

                            {/* Категории в фильтре */}
                            <div className="mb-6">
                                <h3 className="font-medium mb-3 text-gray-700">Категории</h3>
                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                    <label className="flex items-center cursor-pointer">
                                        <input type="checkbox" className="rounded text-brand-gold focus:ring-brand-gold mr-2" />
                                        <span className="text-gray-700">Все товары</span>
                                        <span className="ml-auto text-sm text-gray-400">{products.length}</span>
                                    </label>
                                    {rootCategories.map((cat) => (
                                        <label key={cat.id} className="flex items-center cursor-pointer">
                                            <input type="checkbox" className="rounded text-brand-gold focus:ring-brand-gold mr-2" />
                                            <span className="text-gray-700">{cat.name}</span>
                                            <span className="ml-auto text-sm text-gray-400">
                                                {products.filter(p => {
                                                    const catId = p.category ? (typeof p.category === 'object' ? p.category.id : p.category) : null;
                                                    return catId === cat.id;
                                                }).length}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Цена */}
                            <div className="mb-6">
                                <h3 className="font-medium mb-3 text-gray-700">Цена</h3>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder="от"
                                        className="w-1/2 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold"
                                    />
                                    <input
                                        type="number"
                                        placeholder="до"
                                        className="w-1/2 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold"
                                    />
                                </div>
                            </div>

                            {/* Наличие */}
                            <div>
                                <h3 className="font-medium mb-3 text-gray-700">Наличие</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center cursor-pointer">
                                        <input type="radio" name="stock" className="text-brand-gold focus:ring-brand-gold mr-2" />
                                        <span className="text-gray-700">Все товары</span>
                                    </label>
                                    <label className="flex items-center cursor-pointer">
                                        <input type="radio" name="stock" className="text-brand-gold focus:ring-brand-gold mr-2" />
                                        <span className="text-gray-700">В наличии</span>
                                    </label>
                                    <label className="flex items-center cursor-pointer">
                                        <input type="radio" name="stock" className="text-brand-gold focus:ring-brand-gold mr-2" />
                                        <span className="text-gray-700">Под заказ</span>
                                    </label>
                                </div>
                            </div>

                            <button className="w-full mt-6 btn-dark py-2 rounded-lg font-medium">
                                Применить фильтры
                            </button>
                        </div>
                    </motion.aside>

                    {/* Сетка товаров */}
                    <div className="flex-1">
                        {/* Сортировка */}
                        <motion.div
                            className="bg-white rounded-xl shadow-sm p-4 mb-6 flex justify-between items-center"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                        >
                            <div className="text-gray-600">
                                Найдено: <span className="font-bold text-brand-gold">{products.length}</span> товаров
                            </div>
                            <select className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-gold">
                                <option>По популярности</option>
                                <option>Сначала дешевле</option>
                                <option>Сначала дороже</option>
                                <option>По названию</option>
                            </select>
                        </motion.div>

                        {/* Товары - горизонтальный список */}
                        {products.length === 0 ? (
                            <motion.div
                                className="text-center py-12 bg-white rounded-xl"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p className="text-gray-500">Товаров пока нет</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="space-y-4"
                                variants={staggerChildren}
                                initial="hidden"
                                animate="visible"
                            >
                                {products.map((product) => (
                                    <motion.div key={product.id} variants={productItem}>
                                        <ProductCardHorizontal product={product} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );

    // Вспомогательная функция для подсчета товаров в категории (включая подкатегории)
    function getProductCountInCategory(products: any[], category: any): number {
        // Рекурсивно собираем все ID категории и её подкатегорий
        const getAllCategoryIds = (cat: any): number[] => {
            const ids = [cat.id];
            if (cat.children && cat.children.length) {
                cat.children.forEach((child: any) => {
                    ids.push(...getAllCategoryIds(child));
                });
            }
            return ids;
        };

        const categoryIds = getAllCategoryIds(category);

        return products.filter(product => {
            const productCatId = product.category
                ? (typeof product.category === 'object' ? product.category.id : product.category)
                : null;
            return productCatId && categoryIds.includes(productCatId);
        }).length;
    }
}