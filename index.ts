import { bgBlue, bgRed, cyan, magenta, red, white } from "ansis"
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

/** Shows error messages in console
 * @param objs Data (primitives or objects) to display */
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

      console.info(red(" ⤵︎"), `[object ${Array.isArray(obj) ? "Array" : "Object"}]${red(":")}`)

      handleObject(obj)
    } else {
      console.error(red(" ⤷"), obj)
    }
  }
}

/** Shows info messages in console
 * @param objs Data (primitives or objects) to display */
const info = (...objs: unknown[]): void => {
  if (objs.length === 0) {
    return
  }

  console.info(bgBlue(white(" INFO ")) + cyan(" [") + getTime() + cyan("] "))
  for (const obj of objs) {
    if (obj && typeof obj === "object") {
      console.info(cyan(" ⤵︎"), `[object ${Array.isArray(obj) ? "Array" : "Object"}]${cyan(":")}`)

      handleObject(obj satisfies object)
    } else {
      console.info(cyan(" ⤷"), obj)
    }
  }
}

type NonEmpty<T> = keyof T extends never ? never : T

type VarsType = Record<string, string | number | boolean | Date | string[] | undefined | null>

/** Shows variables in console
 * @param vars Variables
 * @param redacted Variables to redact */
const printVars = async <T extends VarsType>(vars: NonEmpty<T>, redacted: (keyof T)[] = []): Promise<void> => {
  const varsCopy: VarsType = { ...vars } satisfies VarsType

  if (Object.hasOwn(varsCopy, "COLOR")) {
    const { TinyColor } = await import("@ctrl/tinycolor")
    const c = new TinyColor(String(varsCopy["COLOR"] ?? ""))
    if (c.isValid) {
      const { GetColorName: getColorName } = await import("hex-color-to-color-name")
      const { bgHex } = await import("ansis")
      const cHex: string = c.toHexString()
      varsCopy["COLOR"] = `${c.toHexShortString()} » ${getColorName(cHex)} ${bgHex(cHex)("  ")}`
    }
  }

  type V = T[keyof T]

  console.table(
    Object.fromEntries(
      Object.keys(varsCopy).map((k: string) => [
        k,
        // biome-ignore lint/nursery/noUnsafeTypeAssertion: keep wide
        match<V, string | number | boolean>(varsCopy[k] as V)
          .when(
            (): boolean => redacted.includes(k satisfies keyof T),
            (): string => red("[REDACTED]")
          )
          .when(
            (s: unknown): s is string => typeof s === "string",
            (s: string): string => (s === "" ? cyan("[BLANK]") : s)
          )
          .when(
            (d: unknown): d is Date => d instanceof Date,
            (date: Date): string => `${dayjs(date).unix().toString()} ${magenta.italic("(secs)")}`
          )
          .when(
            (s: unknown): s is string[] => Array.isArray(s) && s.every((i: unknown) => typeof i === "string"),
            (s: string[]): string => {
              const len = magenta.italic`[${s.length}]`
              return `${s.join(", ")} ${len}`
            }
          )
          .when(
            (n: unknown): n is number => typeof n === "number",
            (n: number): string | number => (Number.isNaN(n) ? cyan("[NaN]") : n)
          )
          .when(
            (b: unknown): b is boolean => typeof b === "boolean",
            (b: boolean): boolean => b
          )
          .when(
            (u: unknown): u is undefined => typeof u === "undefined",
            (): string => cyan("[UNDEFINED]")
          )
          .when(
            (n: null): n is null => n === null,
            (): string => cyan("[NULL]")
          )
          .otherwise((val: unknown): never => {
            throw new Error(`Unknown type for ${k}: ${typeof val}`) // * NOTE: should never happen because of VarsType
          })
      ])
    )
  )
}

export { error, info, printVars }
