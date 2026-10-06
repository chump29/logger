import { bgBlue, bgHex, bgRed, cyan, red, white } from "ansis"
import { isBrowser } from "browser-or-node"
import { default as dayjs } from "dayjs"
import { match } from "ts-pattern"

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
 * @param objs Data (primitives or objects) to display
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
 * @param objs Data (primitives or objects) to display
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

type VarsType = Record<string, string | number | boolean | Date>

/**
 * Shows variables in console
 * @param vars Variables
 * @param redacted Variables to redact
 */
const printVars = <T extends VarsType>(vars: T, redacted: (keyof T)[] = []): void => {
  const varsCopy: VarsType = { ...vars } as VarsType

  try {
    const color: string = String(vars["COLOR"] || "")
    if (color.length > 0) {
      varsCopy["COLOR"] = `${color} ${bgHex(color)`⌷`}`
    }
  } catch {
    // handles vars["COLOR"] error if nonexistent
  }

  type V = T[keyof T]

  console.table(
    Object.fromEntries(
      Object.keys(varsCopy).map((k: string) => [
        k,
        match<V, string | number | boolean>(varsCopy[k] as V)
          .when(
            (): boolean => redacted.includes(k as keyof T),
            (): string => red("[REDACTED]")
          )
          .when(
            (s: unknown): s is string => typeof s === "string",
            (s: string): string => (s === "" ? cyan("[BLANK]") : s)
          )
          .when(
            (d: unknown): d is Date => d instanceof Date,
            (date: Date): string => date.toISOString()
          )
          .otherwise((val: V): number | boolean => val as number | boolean)
      ])
    )
  )
}

export { error, info, printVars }
