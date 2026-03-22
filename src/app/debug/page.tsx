import { getProducts } from "@/lib/api";

export default async function DebugPage() {
    const products = await getProducts();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Отладка: данные из Directus</h1>

            <div className="bg-gray-100 p-4 rounded mb-8">
                <h2 className="font-bold mb-2">Сырые данные (первые 2 товара):</h2>
                <pre className="text-sm overflow-auto">
          {JSON.stringify(products.slice(0, 2), null, 2)}
        </pre>
            </div>

            <div className="grid gap-4">
                {products.map((product) => (
                    <div key={product.id} className="border p-4 rounded">
                        <p><strong>ID:</strong> {product.id}</p>
                        <p><strong>Название:</strong> {product.name}</p>
                        <p><strong>Поле image:</strong> {product.image || 'отсутствует'}</p>
                        <p><strong>Тип поля image:</strong> {typeof product.image}</p>

                        {product.image && (
                            <div className="mt-2">
                                <p><strong>Пробуем загрузить:</strong></p>
                                <img
                                    src={`http://localhost:8055/assets/${product.image}`}
                                    alt="test"
                                    className="max-w-[200px] border"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.parentElement!.innerHTML +=
                                            '<p class="text-red-500">❌ Ошибка загрузки</p>';
                                    }}
                                    onLoad={() => console.log(' loaded')}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}