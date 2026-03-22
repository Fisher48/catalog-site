import { NextResponse } from 'next/server';

export async function GET() {
    const results: any = {
        timestamp: new Date().toISOString(),
        checks: {}
    };

    // Проверка health
    try {
        const healthRes = await fetch('http://localhost:8055/server/health');
        results.checks.health = {
            status: healthRes.status,
            ok: healthRes.ok,
            data: await healthRes.json()
        };
    } catch (e: any) {
        results.checks.health = { error: e.message };
    }

    // Проверка products с деталями
    try {
        const productsRes = await fetch('http://localhost:8055/items/products', {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        results.checks.products = {
            status: productsRes.status,
            ok: productsRes.ok,
            statusText: productsRes.statusText,
            headers: Object.fromEntries(productsRes.headers)
        };

        if (productsRes.ok) {
            const data = await productsRes.json();
            results.checks.products.data = data;
        } else {
            const errorText = await productsRes.text();
            results.checks.products.error = errorText;
        }
    } catch (e: any) {
        results.checks.products = { error: e.message };
    }

    return NextResponse.json(results);
}