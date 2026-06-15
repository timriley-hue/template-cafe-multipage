import menu from "@/content/menu.json";

export default function MenuPage() {
  return (
    <main>
      <h1>Our Menu</h1>
      {menu.categories.map((cat) => (
        <section key={cat.name}>
          <h2>{cat.name}</h2>
          <ul>
            {cat.items.map((item) => (
              <li key={item.name}>
                <span>{item.name}</span>
                <span>£{item.price}</span>
                {item.dietary.length > 0 && (
                  <span>{item.dietary.join(", ")}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
