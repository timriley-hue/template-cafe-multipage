import { readFileSync } from "fs";
import { join } from "path";

export default function AboutPage() {
  // Markdown rendered as plain text for now — swap for a markdown parser when styling
  const content = readFileSync(join(process.cwd(), "content/about.md"), "utf-8");
  const body = content.replace(/^#.*\n/, "").trim();

  return (
    <main>
      <h1>About Us</h1>
      {body.split("\n\n").map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </main>
  );
}
