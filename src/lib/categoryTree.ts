import { Category } from "./api";

export function buildCategoryTree(categories: Category[]): Category[] {
    const map: { [key: number]: Category & { children: Category[] } } = {};
    const roots: Category[] = [];

    // Создаем карту и добавляем поле children
    categories.forEach(cat => {
        map[cat.id] = { ...cat, children: [] };
    });

    // Строим дерево
    categories.forEach(cat => {
        if (cat.parent) {
            const parentId = typeof cat.parent === 'object' ? cat.parent.id : cat.parent;
            if (map[parentId]) {
                map[parentId].children.push(map[cat.id]);
            } else {
                roots.push(map[cat.id]);
            }
        } else {
            roots.push(map[cat.id]);
        }
    });

    return roots;
}