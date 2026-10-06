import { isBrowser } from "browser-or-node"
import { default as dayjs } from "dayjs"
import { caseInsensitive, charIn, createRegExp, exactly } from "magic-regexp"
import { bgBlue, bgRed, cyan, red, white } from "picocolors"

const getTime = (): string => white(dayjs().format("MM/DD/YYYY [@] HH:mm:ss.SSS"))

const handleObject = (obj: object): void => {
  if (isBrowser) {
    console.groupCollapsed("Click for more information...")
  }

  console.dir(obj, {
    depth: null
  })

  if (isBrowser) {
    console.groupEnd()
  }
}

/**
 * Shows error messages in console
 * @function
 * @param {unknown[]} objs Data (primitives or objects) to display
 */
const error = (...objs: unknown[]): void => {
  if (objs.length === 0) {
    return
  }

  console.error(bgRed(white(" ERROR ")) + red(" [") + getTime() + red("] "))

  for (const obj of objs) {
    if (obj && typeof obj === "object") {
      if (obj instanceof Error) {
        console.error(red(" ⤷"), `${obj.name}: ${obj.message}`)
      }

      console.info(red("⤵︎"), `[object ${Array.isArray(obj) ? "Array" : "Object"}]${red(":")}`)

      handleObject(obj)
    } else {
      console.error(red(" ⤷"), obj)
    }
  }
}

/**
 * Shows info messages in console
 * @function
 * @param {unknown[]} objs Data (primitives or objects) to display
 */
const info = (...objs: unknown[]): void => {
  if (objs.length === 0) {
    return
  }

  console.info(bgBlue(white(" INFO ")) + cyan(" [") + getTime() + cyan("] "))
  for (const obj of objs) {
    if (obj && typeof obj === "object") {
      console.info(cyan("⤵︎"), `[object ${Array.isArray(obj) ? "Array" : "Object"}]${cyan(":")}`)

      handleObject(obj as object)
    } else {
      console.info(cyan(" ⤷"), obj)
    }
  }
}

type VarsType = Record<string, string | number | boolean>

/**
 * Displays variables
 * @function
 * @param {VarsType} vars Variables
 * @param {string[]} [redacted] Variables to redact
 */
const printVars = (vars: VarsType, redacted: string[] = []): void => {
  type T = keyof VarsType

  const REDACTED: T[] = redacted

  const varsCopy: VarsType = { ...vars }

  const color: string = String(vars["COLOR"] || "")
  if (color) {
    const hex: string = "abcdef0123456789"

    const regexp = createRegExp(
      exactly("#").at.lineStart(),
      charIn(hex).times(2).groupedAs("rr"),
      charIn(hex).times(2).groupedAs("gg"),
      charIn(hex).times(2).groupedAs("bb").at.lineEnd(),
      [caseInsensitive]
    )

    const match = color.match(regexp)
    const groups = match?.groups
    if (groups?.rr && groups.gg && groups.bb) {
      const { rr, gg, bb } = groups
      const [r, g, b] = [rr, gg, bb].map((val: string): number => Number.parseInt(val, 16))

      varsCopy["COLOR"] = `${vars["COLOR"]} \x1b[48;2;${r};${g};${b}m⌷\x1b[0m`
    }
  }

  console.table({
    ...varsCopy,
    ...Object.fromEntries(REDACTED.map((k: T): [T, string] => [k, red("[REDACTED]")]))
  })
}

export { error, info, printVars }
