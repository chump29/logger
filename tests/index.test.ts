import { describe, expect, mock, spyOn, test } from "bun:test"

import { error, info, printVars } from "../index.ts"

// * NOTE: suppress console output
const groupSpy = spyOn(console, "groupCollapsed").mockImplementation((): void => undefined)
const dirSpy = spyOn(console, "dir").mockImplementation((): void => undefined)
const infoSpy = spyOn(console, "info").mockImplementation((): void => undefined)
const errorSpy = spyOn(console, "error").mockImplementation((): void => undefined)
const tableSpy = spyOn(console, "table").mockImplementation((): void => undefined)

mock.module("browser-or-node", (): unknown => ({
  isBrowser: true
}))

describe("index.ts", (): void => {
  test("info fail", (): void => {
    info()
    expect(infoSpy).not.toHaveBeenCalledTimes(1)
  })

  test("info pass", (): void => {
    const NUM_TIMES_INFO = 5

    interface ITest {
      is: string
    }

    info(
      "this",
      {
        is: "a"
      } satisfies ITest,
      ["simple", "test"] satisfies string[],
      null
    )

    expect(infoSpy).toHaveBeenCalledTimes(NUM_TIMES_INFO)
    expect(groupSpy).toHaveBeenCalledTimes(2)
    expect(dirSpy).toHaveBeenCalledTimes(2)
  })

  test("error fail", (): void => {
    error()

    expect(errorSpy).not.toHaveBeenCalledTimes(1)
  })

  test("error pass", (): void => {
    const NUM_TIMES_ERROR = 4

    error("test", ["me"], new Error("This is a test"), null)

    expect(errorSpy).toHaveBeenCalledTimes(NUM_TIMES_ERROR)
    expect(groupSpy).toHaveBeenCalledTimes(NUM_TIMES_ERROR)
    expect(dirSpy).toHaveBeenCalledTimes(NUM_TIMES_ERROR)
  })

  test("printVars", async (): Promise<void> => {
    await printVars(
      {
        ARRAY: ["foo", "bar"],
        BLANK: "",
        BOOLEAN: true,
        COLOR: "#c0ffee",
        DATE: new Date(),
        NAN: Number.NaN,
        NULL: null,
        NUMBER: 123,
        SECRET: "!",
        UNDEFINED: undefined
      },
      ["SECRET"]
    )

    expect(tableSpy).toHaveBeenCalledTimes(1)
  })
})
