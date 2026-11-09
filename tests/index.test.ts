import { describe, expect, mock, spyOn, test } from "bun:test"

import { error, info, printVars } from "../index.ts"

const groupSpy = spyOn(console, "groupCollapsed")
const dirSpy = spyOn(console, "dir")
const infoSpy = spyOn(console, "info")
const errorSpy = spyOn(console, "error")
const tableSpy = spyOn(console, "table")

if (Bun.env.TEST_FULL !== "true") {
  groupSpy.mockImplementation((): void => undefined)
  dirSpy.mockImplementation((): void => undefined)
  infoSpy.mockImplementation((): void => undefined)
  errorSpy.mockImplementation((): void => undefined)
  tableSpy.mockImplementation((): void => undefined)
}

mock.module("browser-or-node", (): unknown => ({
  isBrowser: true
}))

describe("index.ts", (): void => {
  test("info fail", (): void => {
    info()

    expect(infoSpy).not.toHaveBeenCalledOnce()
  })

  test("info pass", (): void => {
    const NUM_TIMES_INFO = 5

    info(
      "this",
      {
        is: "a"
      },
      ["simple", "test"],
      null
    )

    expect(infoSpy).toHaveBeenCalledTimes(NUM_TIMES_INFO)
    expect(groupSpy).toHaveBeenCalledTimes(2)
    expect(dirSpy).toHaveBeenCalledTimes(2)
  })

  test("error fail", (): void => {
    error()

    expect(errorSpy).not.toHaveBeenCalledOnce()
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

    expect(tableSpy).toHaveBeenCalledOnce()
  })
})
