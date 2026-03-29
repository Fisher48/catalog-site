"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import QuoteForm from "./QuoteForm";

export default function HomeHero() {
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const fadeInLeft = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }
    };

    const fadeInRight = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.3 } }
    };

    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const statsItem = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <>
            <section className="relative text-white overflow-hidden">
                {/* Фоновое изображение */}
                <div className="absolute inset-0">
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: "url('/images/hero-bg.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center 40%",
                            backgroundRepeat: "no-repeat",
                        }}
                    ></div>

                    {/* Градиентный оверлей */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: "linear-gradient(to right, rgba(11,31,58,0.9) 0%, rgba(11,31,58,0.7) 40%, rgba(11,31,58,0.3) 100%)"
                        }}
                    ></div>
                </div>

                {/* Контент */}
                <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-20 relative z-10">
                    <motion.div
                        className="grid md:grid-cols-2 gap-8 items-center"
                        initial="hidden"
                        animate="visible"
                        variants={staggerChildren}
                    >
                        {/* Левая часть - текст */}
                        <motion.div variants={fadeInLeft}>
                            <motion.h1
                                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
                                variants={fadeInUp}
                            >
                                Запорная арматура<br />
                                <span className="text-[#C2A46D]">в Липецке</span>
                            </motion.h1>
                            <motion.p
                                className="text-lg md:text-xl mb-8 text-gray-200"
                                variants={fadeInUp}
                                transition={{ delay: 0.1 }}
                            >
                                Поставка деталей трубопроводов от производителя.<br />
                                Более 5000 наименований в наличии.
                            </motion.p>
                            <motion.div
                                className="flex flex-wrap gap-4"
                                variants={fadeInUp}
                                transition={{ delay: 0.2 }}
                            >
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href="/catalog"
                                        className="btn-gold px-8 py-3 rounded-lg hover:bg-white
                                         font-semibold text-base hover:bg-[#D4B27C] transition shadow-lg inline-block"
                                    >
                                        Перейти в каталог
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <button
                                        onClick={() => setIsQuoteOpen(true)}
                                        className="border-2 border-[#C2A46D] text-white px-8 py-3 rounded-lg
                                        font-semibold text-base hover:bg-[#C2A46D] hover:text-[#0B1F3A] transition"
                                    >
                                        Запросить прайс
                                    </button>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* Правая часть - изображение */}
                        {/*<motion.div*/}
                        {/*    className="hidden md:block"*/}
                        {/*    variants={fadeInRight}*/}
                        {/*>*/}
                        {/*    <motion.img*/}
                        {/*        src="/images/favicon.jpg"*/}
                        {/*        alt="Трубопроводная арматура"*/}
                        {/*        className="w-full max-w-md mx-auto drop-shadow-2xl"*/}
                        {/*        animate={{*/}
                        {/*            y: [0, -10, 0],*/}
                        {/*        }}*/}
                        {/*        transition={{*/}
                        {/*            duration: 4,*/}
                        {/*            repeat: Infinity,*/}
                        {/*            ease: "easeInOut"*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</motion.div>*/}
                    </motion.div>
                </div>

                {/* Статистика */}
                <motion.div
                    className="container mx-auto px-10 md:px-10 lg:px-28 py-8 border-t border-white/20 relative z-10"
                    initial="hidden"
                    animate="visible"
                    variants={staggerChildren}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <motion.div variants={statsItem}>
                            <div className="text-2xl md:text-3xl font-bold text-[#C2A46D]">20+</div>
                            <div className="text-sm text-gray-300 font-bold">лет на рынке</div>
                        </motion.div>
                        <motion.div variants={statsItem}>
                            <div className="text-2xl md:text-3xl font-bold text-[#C2A46D]">5000+</div>
                            <div className="text-sm text-gray-300 font-bold">товаров в наличии</div>
                        </motion.div>
                        <motion.div variants={statsItem}>
                            <div className="text-2xl md:text-3xl font-bold text-[#C2A46D]">1000+</div>
                            <div className="text-sm text-gray-300 font-bold">довольных клиентов</div>
                        </motion.div>
                        <motion.div variants={statsItem}>
                            <div className="text-2xl md:text-3xl font-bold text-[#C2A46D]">24/7</div>
                            <div className="text-sm text-gray-300 font-bold">обработка заявок</div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            <QuoteForm
                isOpen={isQuoteOpen}
                onClose={() => setIsQuoteOpen(false)}
            />
        </>
    );
}