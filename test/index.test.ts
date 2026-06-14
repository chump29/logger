import { describe, expect, type jest, mock, spyOn, test } from "bun:test"

import { error, info } from "../index.ts"

describe("index.ts", (): void => {
  const infoSpy: jest.Mock = spyOn(console, "info")

  mock.module("browser-or-node", (): unknown => ({
    isBrowser: true
  }))

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
      [
        "simple",
        "test"
      ] as string[],
      null
    )

    expect(infoSpy).toHaveBeenCalledTimes(NUM_TIMES_INFO)
  })

  const errorSpy: jest.Mock = spyOn(console, "error")

  test("error fail", (): void => {
    error()

    expect(errorSpy).not.toHaveBeenCalledTimes(1)
  })

  test("error pass", (): void => {
    const NUM_TIMES_ERROR: number = 4

    error(
      "test",
      [
        "me"
      ],
      new Error("This is a test"),
      null
    )

    expect(errorSpy).toHaveBeenCalledTimes(NUM_TIMES_ERROR)
  })
})
