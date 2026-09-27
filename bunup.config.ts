import { defineConfig } from "bunup"
import { copy } from "bunup/plugins"

const config: ReturnType<typeof defineConfig> = defineConfig({
  exports: true,
  footer: "// ♡ ᓚᘏᗢ ♡",
  minify: true,
  plugins: [copy(["LICENSE", "package.json", "README.md"])],
  target: "browser",
  unused: {
    level: "error"
  }
})

export default config
