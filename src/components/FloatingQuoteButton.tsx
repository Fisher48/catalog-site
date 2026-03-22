"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import QuoteForm from "./QuoteForm";

export default function FloatingQuoteButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-110 z-40"
            >
                <MessageSquare size={24} />
            </button>

            <QuoteForm
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}