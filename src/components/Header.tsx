"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, Mail, ChevronDown, ChevronRight } from "lucide-react";
import QuoteForm from "./QuoteForm";
import { getCategories } from "@/lib/api";
import { buildCategoryTree } from "@/lib/categoryTree";

interface Category {
    id: number;
    name: string;
    slug: string;
    parent?: number | Category;
    children?: Category[];
}

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    const catalogRef = useRef<HTMLDivElement>(null);

    // Загружаем категории
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                const tree = buildCategoryTree(data);
                setCategories(tree);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategories();
    }, []);

    // Закрываем меню при клике вне
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (catalogRef.current && !catalogRef.current.contains(event.target as Node)) {
                setIsCatalogOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Только корневые категории (где нет родителя)
    const rootCategories = categories.filter(cat => !cat.parent);

    return (
        <>
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                {/* Верхняя полоса */}
                <div className="bg-gray-800 text-white text-sm py-2">
                    <div className="container mx-auto px-6 md:px-8 lg:px-12 flex justify-between items-center">
                        <div className="flex items-center space-x-6">
                            <a href="tel:+7474123456" className="flex items-center hover:text-blue-300">
                                <Phone size={16} className="mr-2" />
                                +7 (4742) 12-34-56
                            </a>
                            <a href="mailto:info@fundament48.ru" className="flex items-center hover:text-blue-300">
                                <Mail size={16} className="mr-2" />
                                info@fundament48.ru
                            </a>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span>Пн-Пт: 9:00 - 18:00</span>
                            <span className="w-px h-4 bg-gray-700"></span>
                            <span>Липецк, ул. Неделина, 123</span>
                        </div>
                    </div>
                </div>

                {/* Основное меню */}
                <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-4">
                    <div className="flex justify-between items-center">
                        {/* Логотип */}
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                                <img
                                    src="/images/favicon.jpg"
                                    alt="ТД Фундамент"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="font-bold">
                                <div className="text-xl text-gray-900">ТД Фундамент</div>
                                <div className="text-xs text-gray-500">Запорная арматура</div>
                            </div>
                        </Link>

                        {/* Десктопная навигация */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link href="/" className="hover-scale hover:text-brand-gold font-medium transition">
                                Главная
                            </Link>

                            {/* Каталог с выпадающим меню */}
                            <div ref={catalogRef} className="relative">
                                <button
                                    onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                                    className="flex items-center hover-scale hover:text-brand-gold font-medium transition"
                                >
                                    Каталог
                                    <ChevronDown
                                        size={18}
                                        className={`ml-1 transition-transform duration-200 ${isCatalogOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {/* Выпадающее меню */}
                                {isCatalogOpen && (
                                    <div className="absolute top-full left-0 mt-2 bg-white rounded-lg
                                    shadow-xl border border-gray-100 z-50 min-w-[220px]">
                                        {isLoading ? (
                                            <div className="px-4 py-3 text-gray-500">Загрузка...</div>
                                        ) : rootCategories.length > 0 ? (
                                            <div className="py-2">
                                                {rootCategories.map((cat) => (
                                                    <div key={cat.id} className="relative">
                                                        <Link
                                                            href={`/category/${cat.slug}`}
                                                            className="flex items-center hover-scale justify-between px-4 py-2
                                                            hover:bg-brand-gold/10 hover:text-brand-gold transition"
                                                            onClick={() => setIsCatalogOpen(false)}
                                                        >
                                                            <span>{cat.name}</span>
                                                            {cat.children && cat.children.length > 0 && (
                                                                <ChevronRight size={16} className="text-gray-400" />
                                                            )}
                                                        </Link>
                                                        {/* Подкатегории */}
                                                        {cat.children && cat.children.length > 0 && (
                                                            <div
                                                                className="absolute left-full top-0 ml-1 hidden hover:block bg-white rounded-lg shadow-lg border border-gray-100 min-w-[200px] z-50"
                                                                style={{ display: 'none' }}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.display = 'block';
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.display = 'none';
                                                                }}
                                                            >
                                                                <div className="py-2">
                                                                    {cat.children.map((sub) => (
                                                                        <Link
                                                                            key={sub.id}
                                                                            href={`/category/${sub.slug}`}
                                                                            className="block px-4 py-2 hover:bg-brand-gold/10 hover:text-brand-gold whitespace-nowrap transition"
                                                                            onClick={() => setIsCatalogOpen(false)}
                                                                        >
                                                                            {sub.name}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <Link
                                                href="/catalog"
                                                className="block px-4 py-2 hover:bg-brand-gold/10
                                                hover:text-brand-gold transition"
                                                onClick={() => setIsCatalogOpen(false)}
                                            >
                                                Все товары
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>

                            <Link href="/about" className="hover-scale hover:text-brand-gold font-medium transition">
                                О компании
                            </Link>
                            <Link href="/delivery" className="hover-scale hover:text-brand-gold font-medium transition">
                                Доставка
                            </Link>
                            <Link href="/contacts" className="hover-scale hover:text-brand-gold font-medium transition">
                                Контакты
                            </Link>
                        </nav>

                        {/* Кнопка запроса цены */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsQuoteOpen(true)}
                                className="hidden md:block btn-dark px-6 py-2 rounded-lg font-medium"
                            >
                                Запросить цену
                            </button>

                            {/* Кнопка мобильного меню */}
                            <button
                                className="md:hidden p-2 text-gray-600"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Мобильное меню */}
                    {isMenuOpen && (
                        <nav className="md:hidden mt-4 py-4 border-t border-gray-200">
                            <Link href="/" className="block py-2 text-gray-700 hover:text-brand-gold" onClick={() => setIsMenuOpen(false)}>
                                Главная
                            </Link>
                            <div className="py-2">
                                <div className="font-medium text-gray-700 mb-2">Каталог</div>
                                <div className="pl-4 space-y-1">
                                    <Link href="/catalog" className="block py-1 text-gray-600 hover:text-brand-gold" onClick={() => setIsMenuOpen(false)}>
                                        Все товары
                                    </Link>
                                    {!isLoading && rootCategories.map((cat) => (
                                        <div key={cat.id}>
                                            <Link
                                                href={`/category/${cat.slug}`}
                                                className="block py-1 text-gray-600 hover:text-brand-gold"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {cat.name}
                                            </Link>
                                            {cat.children && cat.children.length > 0 && (
                                                <div className="pl-4 space-y-1 mt-1">
                                                    {cat.children.map((sub) => (
                                                        <Link
                                                            key={sub.id}
                                                            href={`/category/${sub.slug}`}
                                                            className="block py-1 text-sm text-gray-500 hover:text-brand-gold"
                                                            onClick={() => setIsMenuOpen(false)}
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Link href="/about" className="block py-2 text-gray-700 hover:text-brand-gold" onClick={() => setIsMenuOpen(false)}>
                                О компании
                            </Link>
                            <Link href="/delivery" className="block py-2 text-gray-700 hover:text-brand-gold" onClick={() => setIsMenuOpen(false)}>
                                Доставка
                            </Link>
                            <Link href="/contacts" className="block py-2 text-gray-700 hover:text-brand-gold" onClick={() => setIsMenuOpen(false)}>
                                Контакты
                            </Link>
                            <button
                                onClick={() => {
                                    setIsQuoteOpen(true);
                                    setIsMenuOpen(false);
                                }}
                                className="w-full mt-4 btn-dark px-6 py-2 rounded-lg font-medium"
                            >
                                Запросить цену
                            </button>
                        </nav>
                    )}
                </div>
            </header>

            <QuoteForm
                isOpen={isQuoteOpen}
                onClose={() => setIsQuoteOpen(false)}
            />
        </>
    );
}