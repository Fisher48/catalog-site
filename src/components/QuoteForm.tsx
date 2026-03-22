"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface QuoteFormProps {
    isOpen: boolean;
    onClose: () => void;
    productId?: number;
    productName?: string;
}

export default function QuoteForm({ isOpen, onClose, productId, productName }: QuoteFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const response = await fetch("http://localhost:8055/items/quote_requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email || null,
                    message: formData.message || null,
                    product_id: productId || null,
                    product_name: productName || null,
                    status: "new",
                }),
            });

            if (!response.ok) {
                throw new Error("Ошибка при отправке");
            }

            setIsSuccess(true);
            setTimeout(() => {
                onClose();
                setFormData({ name: "", phone: "", email: "", message: "" });
                setIsSuccess(false);
            }, 2000);
        } catch (err) {
            setError("Произошла ошибка. Попробуйте позже.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
                >
                    <X size={24} />
                </button>

                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Запросить цену
                    </h2>
                    {productName && (
                        <p className="text-gray-600 mt-1">
                            Товар: <span className="font-medium">{productName}</span>
                        </p>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    {isSuccess ? (
                        <div className="bg-green-50 text-green-700 p-4 rounded-lg text-center">
                            ✓ Заявка отправлена! Мы свяжемся с вами.
                        </div>
                    ) : (
                        <>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Имя *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Введите ваше имя"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Телефон *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="+7 (999) 999-99-99"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="example@mail.ru"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Сообщение
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Дополнительная информация..."
                                />
                            </div>

                            {error && (
                                <div className="mb-4 text-red-600 text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                            >
                                {isSubmitting ? "Отправка..." : "Отправить заявку"}
                            </button>

                            <p className="text-xs text-gray-500 text-center mt-4">
                                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                            </p>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}