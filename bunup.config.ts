import { defineConfig } from "bunup"
import { copy } from "bunup/plugins"

const additionalFiles = ["LICENSE", "package.json", "README.md"].toSorted((a: string, b: string): number =>
  a.localeCompare(b)
)

export default defineConfig({
  footer: "// ♡ ᓚᘏᗢ ♡",
  minify: true,
  plugins: [copy(additionalFiles)],
  target: "browser",
  onSuccess: (): void => console.info(` 🗐  Copying ${additionalFiles.join(", ")}…`),
  unused: {
    level: "error"
  }
})
