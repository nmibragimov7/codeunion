export const initialValues = {
    name: "",
    email: "",
    permissions: {
        moderation: false,
        blog: false,
        support: false,
        inquiries: false,
        analytics: false,
        stock: false,
    },
    image: "",
}

export const permissions: Record<string, string> = {
    moderation: "Модерация объявлений",
    blog: "Блог",
    support: "Тех. поддержка",
    inquiries: "Обращения клиентов",
    analytics: "Аналитика",
    stock: "Акции",
}
