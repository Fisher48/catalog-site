"use client";

import { useState } from "react";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import { Check, Shield, Truck, Clock, CreditCard } from "lucide-react";

interface ProductClientProps {
    product: any;
}

export default function ProductClient({ product }: ProductClientProps) {
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("description");

    const imageId = product.image?.id;
    const imageUrl = imageId
        ? `http://localhost:8055/assets/${imageId}?width=800&height=800&fit=cover`
        : null;

    // Преимущества товара (можно вынести в Directus)
    const features = [
        { icon: Check, text: "Гарантия качества", desc: "Сертифицированная продукция" },
        { icon: Shield, text: "Надежность", desc: "Срок службы 25 лет" },
        { icon: Truck, text: "Быстрая доставка", desc: "По Липецку и области" },
        { icon: Clock, text: "В наличии", desc: "Отгрузка в день заказа" },
        { icon: CreditCard, text: "Удобная оплата", desc: "Наличная, безналичная" },
    ];

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
                                href={`/category/${product.category.slug}`}
                                className="hover:text-blue-600"
                            >
                                {product.category.name}
                            </Link>
                        </>
                    )}
                    <span className="mx-2">/</span>
                    <span className="text-gray-700">{product.name}</span>
                </div>

                {/* Основная информация о товаре */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Фото */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                        <div className="aspect-square relative">
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
                                    <span className="text-gray-400">Нет фото</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Информация */}
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                        {product.article && (
                            <p className="text-gray-500 mb-4">
                                Артикул: <span className="font-medium">{product.article}</span>
                            </p>
                        )}

                        {/* Цена и наличие */}
                        <div className="bg-gray-50 rounded-xl p-6 mb-6">
                            <div className="flex items-baseline gap-4 mb-4">
                                {product.price ? (
                                    <span className="text-4xl font-bold text-blue-600">
                                        {product.price.toLocaleString()} ₽
                                    </span>
                                ) : (
                                    <span className="text-2xl text-gray-500">Цена по запросу</span>
                                )}
                                {product.old_price && (
                                    <span className="text-lg text-gray-400 line-through">
                                        {product.old_price.toLocaleString()} ₽
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-4">
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
                                <span className="text-sm text-gray-500">Срок поставки: от 1 дня</span>
                            </div>
                        </div>

                        {/* Кнопка запроса */}
                        <button
                            onClick={() => setIsQuoteOpen(true)}
                            className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105 mb-6"
                        >
                            Запросить цену
                        </button>

                        {/* Преимущества */}
                        <div className="grid grid-cols-2 gap-4">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <feature.icon size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-medium text-gray-900">{feature.text}</div>
                                        <div className="text-sm text-gray-500">{feature.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Табы: Описание, Характеристики, Доставка */}
                <div className="bg-white rounded-xl border border-gray-100">
                    <div className="border-b border-gray-100">
                        <div className="flex gap-6 px-6">
                            <button
                                onClick={() => setActiveTab("description")}
                                className={`py-4 font-medium transition ${
                                    activeTab === "description"
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                Описание
                            </button>
                            <button
                                onClick={() => setActiveTab("specifications")}
                                className={`py-4 font-medium transition ${
                                    activeTab === "specifications"
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                Характеристики
                            </button>
                            <button
                                onClick={() => setActiveTab("delivery")}
                                className={`py-4 font-medium transition ${
                                    activeTab === "delivery"
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                Доставка и оплата
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Описание */}
                        {activeTab === "description" && (
                            <div className="prose max-w-none">
                                {product.description ? (
                                    <div className="text-gray-700 whitespace-pre-line">
                                        {product.description}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">Описание товара отсутствует</p>
                                )}
                            </div>
                        )}

                        {/* Характеристики */}
                        {activeTab === "specifications" && (
                            <div>
                                {product.specifications && Object.keys(product.specifications).length > 0 ? (
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {Object.entries(product.specifications).map(([key, value]) => (
                                            <div key={key} className="flex py-3 border-b border-gray-100">
                                                <span className="w-2/5 text-gray-600">{key}:</span>
                                                <span className="w-3/5 font-medium text-gray-900">{String(value)}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">Характеристики отсутствуют</p>
                                )}
                            </div>
                        )}

                        {/* Доставка и оплата */}
                        {activeTab === "delivery" && (
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Доставка</h3>
                                    <p className="text-gray-700">
                                        Доставка по Липецку и Липецкой области осуществляется в день заказа.
                                        Отправка в регионы России — транспортными компаниями. Срок поставки от 1 дня.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Оплата</h3>
                                    <p className="text-gray-700">
                                        • Наличный расчет<br />
                                        • Безналичный расчет<br />
                                        • Оплата по счету для юридических лиц<br />
                                        • Для постоянных клиентов возможна отсрочка платежа
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Документы</h3>
                                    <p className="text-gray-700">
                                        Каждый заказ сопровождается полным пакетом документов:
                                        накладные, счета-фактуры, паспорта изделий, сертификаты качества.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Блок "Почему выбирают нас" */}
                <div className="mt-12 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-center mb-8">Почему выбирают Торговый дом Фундамент</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">20+</div>
                            <div className="text-gray-600">лет на рынке</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">5000+</div>
                            <div className="text-gray-600">товаров в наличии</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">10000+</div>
                            <div className="text-gray-600">довольных клиентов</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                            <div className="text-gray-600">обработка заявок</div>
                        </div>
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