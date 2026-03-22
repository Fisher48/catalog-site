"use client";

import { useState } from "react";
import Link from "next/link";
import QuoteForm from "./QuoteForm";

export default function HomeHero() {
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);

    return (
        <>
            <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="container mx-auto px-4 py-24 relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Запорная арматура в Липецке
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-blue-100">
                            Поставка деталей трубопроводов от производителя.
                            Более 5000 наименований в наличии.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/catalog"
                                className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition transform hover:scale-105"
                            >
                                Перейти в каталог
                            </Link>
                            <button
                                onClick={() => setIsQuoteOpen(true)}
                                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition"
                            >
                                Запросить прайс
                            </button>
                        </div>
                    </div>
                </div>

                {/* Статистика */}
                <div className="container mx-auto px-4 py-12 border-t border-blue-600 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <div className="text-3xl md:text-4xl font-bold">20+</div>
                            <div className="text-blue-200">лет на рынке</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold">5000+</div>
                            <div className="text-blue-200">товаров в наличии</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold">1000+</div>
                            <div className="text-blue-200">довольных клиентов</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold">24/7</div>
                            <div className="text-blue-200">обработка заявок</div>
                        </div>
                    </div>
                </div>
            </section>

            <QuoteForm
                isOpen={isQuoteOpen}
                onClose={() => setIsQuoteOpen(false)}
            />
        </>
    );
}