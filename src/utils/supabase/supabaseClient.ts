import { createClient } from "./client";

export type Product = {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    slug: string;
}

//Tシャツだけ取得する関数
export const getTshirts = async (): Promise<Product[]> => {
    const supabase = createClient();
    const {data, error } = await supabase
    .from("products")
    .select("id, slug, title, price, image, category")
    .eq("category", "tshirts")
    .order("id", {ascending: true})
    .returns<Product[]>()

    if (error || !data) {
        console.log("Error fetching T-shirts:", error);
        return []
    }
    return data;
}