import { beforeAll, describe, expect, type jest, mock, spyOn, test } from "bun:test"

import { error, info, printVars } from "../index.ts"

const groupSpy: jest.Mock = spyOn(console, "groupCollapsed").mockImplementation((): void => undefined)
const dirSpy: jest.Mock = spyOn(console, "dir").mockImplementation((): void => undefined)
const infoSpy: jest.Mock = spyOn(console, "info").mockImplementation((): void => undefined)
const errorSpy: jest.Mock = spyOn(console, "error").mockImplementation((): void => undefined)
const tableSpy: jest.Mock = spyOn(console, "table").mockImplementation((): void => undefined)

beforeAll((): void => {
  // suppress
  groupSpy.mockReset()
  dirSpy.mockReset()
  infoSpy.mockReset()
  errorSpy.mockReset()
  tableSpy.mockReset()
})

mock.module("browser-or-node", (): unknown => ({
  isBrowser: true
}))

describe("index.ts", (): void => {
  test("info fail", (): void => {
    info()
    expect(infoSpy).not.toHaveBeenCalledTimes(1)
  })

  test("info pass", (): void => {
    const NUM_TIMES_INFO: number = 5

    interface ITest {
      is: string
    }

    info(
      "this",
      {
        is: "a"
      } as ITest,
      ["simple", "test"] as string[],
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
    const NUM_TIMES_ERROR: number = 4

    error("test", ["me"], new Error("This is a test"), null)

    expect(errorSpy).toHaveBeenCalledTimes(NUM_TIMES_ERROR)
    expect(groupSpy).toHaveBeenCalledTimes(NUM_TIMES_ERROR)
    expect(dirSpy).toHaveBeenCalledTimes(NUM_TIMES_ERROR)
  })

  test("printVars", (): void => {
    printVars(
      { ARR: ["foo", "bar"], BLANK: "", BOOL: false, COLOR: "#c0ffee", NOW: new Date(), NUM: 123, SECRET: "!" },
      ["SECRET"]
    )

    expect(tableSpy).toHaveBeenCalledTimes(1)
  })
})
