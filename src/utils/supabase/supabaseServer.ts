import { createClient } from "./server";

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  slug: string;
};

// 商品一覧を取得
export const getProductsList = async (): Promise<Product[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("id, slug, title, price, image, category")
    .order("id", {ascending: true})
    .returns<Product[]>();

  if (error) {
    console.error("[getProductsList] Error fetching products:", error);
  }

  return data ?? [];
};

// 商品詳細を取得　(id)
export const getProductsDetail = async (
  productId: number
): Promise<Product | null> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("id, slug, title, price, image, category")
    .eq("id", productId)
    .single<Product>();

  if (error) {
    console.error("[getProductsDetail] Error fetching product by id:", error);
    return null;
  }
  return data;
};

// 商品詳細を取得　(slug)
export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const supabase = createClient();
  const { data, error } = await supabase
  .from("products")
  .select("id, slug, title, price, image, category")
  .eq("slug", slug)
  .single<Product>();

  if (error) {
    console.error("[getProductBySlug] Error fetching product by slug:", error);
    return null;
  }

  return data;
}


// カテゴリに基づいて商品を取得
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
  .from("products")
  .select("id, slug, title, price, image, category")
  .eq("category", category)
  .order("id", {ascending: true})
  .returns<Product[]>();

  if (error) {
    console.error("[getProductsByCategory] Error fetching category products:", error);
  }

  return data ?? [];
}

//検索用関数
export const searchProducts = async (query: string): Promise<Product[]> => {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("search_products_with_synonyms", {
    query,
  });

  if (error) {
    console.error("[searchProducts] Error searching products:", error);
  }

  return data ?? [];
};

//Tシャツだけを取得する関数
// export const getTshirts = async (): Promise<Product[]> => {
//   const supabase = createClient();
//   const { data, error } = await supabase
//     .from("products")
//     .select("id, slug, title, price, image, category")
//     .eq("category", "tshirts")
//     .order("id", { ascending: true})
//     .returns<Product[]>();

//   if (error) {
//     console.log("[getTshirts] Error fetching t-shirts:", error);
//   }

//   return data ?? [];
// }

//ボトムスだけ取得する関数
export const getBottoms = async (): Promise<Product[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
  .from("products")
  .select("id, slug, title, price, image, category")
  .eq("category", "bottoms")
  .order("id", {ascending: true})
  .returns<Product[]>()

  if (error) {
    console.error("[getBottoms] Error fetching bottoms:", error);
  }
  return data ?? [];
}

// シャツだけを取得する関数
export const getShirts = async (): Promise<Product[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
  .from("products")
  .select("id, slug, title, price, image, category")
  .eq("category", "shirts")
  .order("id", {ascending: true})
  .returns<Product[]>()

  if (error) {
    console.error("[geShirts] Error fetching bottoms:", error);
  }

  return data ?? [];

}