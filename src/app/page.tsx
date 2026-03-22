import Header from "@/components/Header";
import Link from "next/link";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import HomeHero from "@/components/HomeHero"; // Новый клиентский компонент для Hero секции

export default async function Home() {
    const products = await getProducts();
    const featuredProducts = products.slice(0, 4);

    return (
        <main>
            <Header />

            {/* Hero секция - вынесена в клиентский компонент */}
            <HomeHero />

            {/* Преимущества */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Почему выбирают нас</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-3xl">🏭</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Прямые поставки</h3>
                            <p className="text-gray-600">
                                Работаем напрямую с заводами-изготовителями без посредников
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-3xl">📦</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Собственный склад</h3>
                            <p className="text-gray-600">
                                Отгрузка в день заказа, доставка по всей России
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-3xl">⚙️</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Гарантия качества</h3>
                            <p className="text-gray-600">
                                Вся продукция сертифицирована, гарантия до 5 лет
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Популярные товары */}
            {featuredProducts.length > 0 && (
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold">Популярные товары</h2>
                            <Link href="/catalog" className="text-blue-600 hover:text-blue-700 font-medium">
                                Смотреть все →
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* О компании */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">О компании «СпецКомплект»</h2>
                            <p className="text-gray-300 mb-4">
                                Мы работаем на рынке трубопроводной арматуры более 20 лет.
                                За это время мы стали надежным партнером для сотен предприятий
                                и организаций по всей России.
                            </p>
                            <p className="text-gray-300 mb-6">
                                Наш ассортимент включает задвижки, краны, клапаны, затворы,
                                фильтры и другие детали трубопроводов от ведущих производителей.
                            </p>
                            <Link
                                href="/about"
                                className="inline-block border-2 border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-gray-900 transition"
                            >
                                Подробнее о нас
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-800 p-6 rounded-lg">
                                <div className="text-3xl font-bold text-blue-400 mb-2">20+</div>
                                <div className="text-gray-300">лет успешной работы</div>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-lg">
                                <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
                                <div className="text-gray-300">производителей</div>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-lg">
                                <div className="text-3xl font-bold text-blue-400 mb-2">10000+</div>
                                <div className="text-gray-300">довольных клиентов</div>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-lg">
                                <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                                <div className="text-gray-300">онлайн поддержка</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}