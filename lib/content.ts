import modules from "@/content/modules.json";

// ---- Types ----

export type HoursRow = { days: string; open: string; close: string };
export type HoursData = { hours: HoursRow[]; notes?: string };

export type MenuItem = { name: string; price: string; dietary: string[] };
export type MenuCategory = { name: string; items: MenuItem[] };
export type MenuData = { categories: MenuCategory[] };

export type FaqItem = { question: string; answer: string };

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
};

// ---- Hours ----

export async function getHours(): Promise<HoursData> {
  if (modules.clientEditing) {
    const { createClient } = await import("@/lib/supabase-server");
    const supabase = await createClient();
    const clientId = process.env.CLIENT_ID;
    const { data } = await supabase
      .from("hours")
      .select("days, open, close")
      .eq("client_id", clientId)
      .order("sort_order");
    return { hours: data ?? [] };
  }
  const file = await import("@/content/hours.json");
  return { hours: file.hours, notes: file.notes };
}

// ---- Menu ----

export async function getMenu(): Promise<MenuData> {
  if (modules.clientEditing) {
    const { createClient } = await import("@/lib/supabase-server");
    const supabase = await createClient();
    const clientId = process.env.CLIENT_ID;
    const { data: cats } = await supabase
      .from("menu_categories")
      .select("id, name")
      .eq("client_id", clientId)
      .order("sort_order");

    const categories: MenuCategory[] = [];
    for (const cat of cats ?? []) {
      const { data: items } = await supabase
        .from("menu_items")
        .select("name, price, dietary")
        .eq("category_id", cat.id)
        .order("sort_order");
      categories.push({ name: cat.name, items: items ?? [] });
    }
    return { categories };
  }
  const file = await import("@/content/menu.json");
  return { categories: file.categories };
}

// ---- FAQ ----

export async function getFaq(): Promise<FaqItem[]> {
  if (modules.clientEditing) {
    const { createClient } = await import("@/lib/supabase-server");
    const supabase = await createClient();
    const clientId = process.env.CLIENT_ID;
    const { data } = await supabase
      .from("faq_items")
      .select("question, answer")
      .eq("client_id", clientId)
      .order("sort_order");
    return data ?? [];
  }
  const file = await import("@/content/home.json");
  return file.faq;
}

// ---- Blog ----

export async function getAllPosts(): Promise<BlogPost[]> {
  if (modules.clientEditing) {
    const { createClient } = await import("@/lib/supabase-server");
    const supabase = await createClient();
    const clientId = process.env.CLIENT_ID;
    const { data } = await supabase
      .from("blog_posts")
      .select("slug, title, excerpt, content, published_at")
      .eq("client_id", clientId)
      .order("published_at", { ascending: false });
    return (data ?? []).map((p) => ({ ...p, date: p.published_at }));
  }
  const { getAllPosts: getFromFiles } = await import("@/lib/blog");
  return getFromFiles();
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  if (modules.clientEditing) {
    const { createClient } = await import("@/lib/supabase-server");
    const supabase = await createClient();
    const clientId = process.env.CLIENT_ID;
    const { data } = await supabase
      .from("blog_posts")
      .select("slug, title, excerpt, content, published_at")
      .eq("client_id", clientId)
      .eq("slug", slug)
      .single();
    if (!data) return undefined;
    return { ...data, date: data.published_at };
  }
  const { getPost: getFromFiles } = await import("@/lib/blog");
  return getFromFiles(slug);
}
