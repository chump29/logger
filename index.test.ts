import { afterAll, describe, expect, jest, spyOn, test } from "bun:test"

import { error, info } from "./index.ts"

afterAll((): void => {
  jest.restoreAllMocks()
})

describe("index.ts", (): void => {
  const infoSpy: jest.Mock = spyOn(console, "info")

  test("info fail", (): void => {
    info()
    expect(infoSpy).not.toHaveBeenCalledTimes(1)
  })

  test("info pass", (): void => {
    const NUM_TIMES_INFO: number = 4

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
      ] as string[]
    )
    expect(infoSpy).toHaveBeenCalledTimes(NUM_TIMES_INFO)
  })

  const errorSpy: jest.Mock = spyOn(console, "error")

  test("error fail", (): void => {
    error()
    expect(errorSpy).not.toHaveBeenCalledTimes(1)
  })

  test("error pass", (): void => {
    class TestError extends Error {
      constructor(reason: string) {
        super(reason)
        this.name = "TestError"
      }
    }

    const NUM_TIMES_ERROR: number = 3

    error("error", new TestError("test"))
    expect(errorSpy).toHaveBeenCalledTimes(NUM_TIMES_ERROR)
  })
})
