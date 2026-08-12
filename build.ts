import { exit } from "node:process"

import { type BuildMetafile, type BuildOutput, build } from "bun"

import { error } from "./index.ts"
import { devDependencies, peerDependencies } from "./package.json" with { type: "json" }

const externalDependencies: string[] = [...Object.keys(devDependencies), ...Object.keys(peerDependencies)]

await build({
  entrypoints: ["./index.ts"],
  external: externalDependencies,
  footer: "// ♡ ᓚᘏᗢ ♡",
  metafile: true,
  minify: true,
  outdir: "./dist"
})
  .then((result: BuildOutput): BuildMetafile | undefined => {
    if (!result.success) {
      error("Build failed", result.logs)
      exit(1)
    }
    return result.metafile
  })
  .then((metafile: BuildMetafile | undefined): void => {
    if (metafile?.outputs) {
      for (const [path, output] of Object.entries(metafile.outputs)) {
        console.info(`${path}: ${output.bytes} bytes`)
        for (const [inputPath, info] of Object.entries(output.inputs)) {
          console.info(`  - ${inputPath}: ${info.bytesInOutput} bytes`)
        }
      }
    }
  })
  .catch((e: unknown): void => {
    error(e)
    exit(1)
  })
