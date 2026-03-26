const API_URL = "http://localhost:8055";

export interface Product {
    id: number;
    name: string;
    slug: string;
    article?: string;           // добавили артикул
    description: string | null;
    price: number | null;
    old_price?: number | null;   // старая цена (для скидок)
    in_stock?: boolean;
    specifications?: {           // характеристики
        [key: string]: string | number;
    };
    image?: {
        id: string;
        filename_disk: string;
    };
    category?: {
        id: number;
        name: string;
        slug: string;
    };
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    parent?: number | Category;
    image?: {
        id: string;
        filename_disk: string;
        title?: string;
    };
    children?: Category[];
}

export async function getProducts(): Promise<Product[]> {
    try {
        const res = await fetch(`${API_URL}/items/products?fields=*.*`, {
            cache: 'no-store', // Не кешировать для разработки
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data.data || [];
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    try {
        const res = await fetch(
            `${API_URL}/items/products?filter[slug][_eq]=${slug}&fields=*.*`,
            { cache: 'no-store' }
        );

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data.data?.[0] || null;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

export async function getCategories(): Promise<Category[]> {
    try {
        const res = await fetch(`${API_URL}/items/categories?fields=*.*`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data.data || [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}