import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { getProducts, getCategories } from "@/lib/api";
import { Filter, Search } from "lucide-react";
import Link from "next/link";
import {buildCategoryTree} from "@/lib/categoryTree";

export default async function CatalogPage() {
    const products = await getProducts();
    const allCategories = await getCategories();

    // Строим дерево категорий и берем только корневые (без parent)
    const categoryTree = buildCategoryTree(allCategories);
    const rootCategories = categoryTree; // это уже корневые категории

    return (
        <main>
            <Header />

            {/* Заголовок */}
            <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-2">Каталог продукции</h1>
                    <p className="text-blue-100">
                        Более {products.length} наименований запорной арматуры в наличии
                    </p>
                </div>
            </section>

            {/* Основной контент */}
            <div className="container mx-auto px-4 py-8">
                {/* Блок корневых категорий (карточки) */}
                {rootCategories.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Категории</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                            {rootCategories.map((cat) => {
                                const imageId = (cat.image as any)?.id;
                                const imageUrl = imageId
                                    ? `http://localhost:8055/assets/${imageId}?width=200&height=200&fit=cover`
                                    : null;

                                return (
                                    <Link
                                        key={cat.id}
                                        href={`/category/${cat.slug}`}
                                        className="group"
                                    >
                                        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
                                            <div className="aspect-square bg-gray-100 overflow-hidden">
                                                {imageUrl ? (
                                                    <img
                                                        src={imageUrl}
                                                        alt={cat.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        📁
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-3 text-center">
                                                <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition">
                                                    {cat.name}
                                                </h3>
                                                {/* Показываем количество товаров в категории (включая подкатегории) */}
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {getProductCountInCategory(products, cat)} товаров
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Боковая панель с фильтрами */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-semibold text-lg flex items-center">
                                    <Filter size={20} className="mr-2" />
                                    Фильтры
                                </h2>
                                <button className="text-sm text-blue-600 hover:text-blue-700">
                                    Сбросить
                                </button>
                            </div>

                            {/* Поиск */}
                            <div className="mb-6">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Поиск товаров..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                                </div>
                            </div>

                            {/* Категории в фильтре (компактный список) */}
                            <div className="mb-6">
                                <h3 className="font-medium mb-3">Категории</h3>
                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="rounded text-blue-600 mr-2" />
                                        <span className="text-gray-700">Все товары</span>
                                        <span className="ml-auto text-sm text-gray-400">{products.length}</span>
                                    </label>
                                    {rootCategories.map((cat) => (
                                        <label key={cat.id} className="flex items-center">
                                            <input type="checkbox" className="rounded text-blue-600 mr-2" />
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
                                <h3 className="font-medium mb-3">Цена</h3>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder="от"
                                        className="w-1/2 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        type="number"
                                        placeholder="до"
                                        className="w-1/2 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Наличие */}
                            <div>
                                <h3 className="font-medium mb-3">Наличие</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input type="radio" name="stock" className="text-blue-600 mr-2" />
                                        <span className="text-gray-700">Все товары</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="stock" className="text-blue-600 mr-2" />
                                        <span className="text-gray-700">В наличии</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="stock" className="text-blue-600 mr-2" />
                                        <span className="text-gray-700">Под заказ</span>
                                    </label>
                                </div>
                            </div>

                            <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                                Применить фильтры
                            </button>
                        </div>
                    </aside>

                    {/* Сетка товаров */}
                    <div className="flex-1">
                        {/* Сортировка */}
                        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex justify-between items-center">
                            <div className="text-gray-600">
                                Найдено: <span className="font-bold text-blue-600">{products.length}</span> товаров
                            </div>
                            <select className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>По популярности</option>
                                <option>Сначала дешевле</option>
                                <option>Сначала дороже</option>
                                <option>По названию</option>
                            </select>
                        </div>

                        {/* Товары */}
                        {products.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-xl">
                                <p className="text-gray-500">Товаров пока нет</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
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