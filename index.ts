import { isBrowser } from "browser-or-node"
import { default as dayjs } from "dayjs"
import { bgBlue, bgRed, cyan, red, white } from "picocolors"

const getTime = (): string => {
  return white(dayjs().format("MM/DD/YYYY @ HH:mm:ss.SSS"))
}

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
  if (!objs.length) {
    return
  }

  console.error(bgRed(white(" ERROR ")) + red(" [") + getTime() + red("] "))

  objs.forEach((obj: unknown): void => {
    if (obj && typeof obj === "object") {
      console.error(red(`⤵︎ [object ${Array.isArray(obj) ? "Array" : "Object"}]:`))

      handleObject(obj)
    } else {
      console.error(red(" ⤷"), obj)
    }
  })
}

/**
 * Shows info messages in console
 * @function
 * @param {unknown[]} objs Data (primitives or objects) to display
 */
const info = (...objs: unknown[]): void => {
  if (!objs.length) {
    return
  }

  console.info(bgBlue(white(" INFO ")) + cyan(" [") + getTime() + cyan("] "))
  objs.forEach((obj: unknown): void => {
    if (obj && typeof obj === "object") {
      console.info(cyan(`⤵︎ [object ${Array.isArray(obj) ? "Array" : "Object"}]:`))

      handleObject(obj as object)
    } else {
      console.info(cyan(" ⤷"), obj)
    }
  })
}

export { error, info }
