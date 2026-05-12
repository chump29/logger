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
    error("error")
    expect(errorSpy).toHaveBeenCalledTimes(2)
  })
})
