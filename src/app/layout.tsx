import type { Metadata } from 'next';
import FloatingQuoteButton from "@/components/FloatingQuoteButton";
import './globals.css';

export const metadata: Metadata = {
    title: 'Торговый дом Фундамент - Запорная арматура',
    description: 'Поставка трубопроводной арматуры в Липецке',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
        <head>
            {/* Подключаем Tailwind через CDN */}
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
            {/* Или более новую версию */}
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@4.2.1/dist/tailwind.min.css" rel="stylesheet" />
        </head>
        <body className="bg-gray-50 text-gray-900 fade-in">
        {children}
        <FloatingQuoteButton />
        </body>
        </html>
    );
}