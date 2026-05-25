import { afterAll, describe, expect, jest, mock, spyOn, test } from "bun:test"

import { error, info } from "../index.ts"

afterAll((): void => {
  jest.restoreAllMocks()
})

describe("index.ts", (): void => {
  const NUM_TIMES: number = 5

  const infoSpy: jest.Mock = spyOn(console, "info")

  mock.module("browser-or-node", (): unknown => {
    return {
      isBrowser: jest.fn().mockReturnValue(true)
    }
  })

  test("info fail", (): void => {
    info()
    expect(infoSpy).not.toHaveBeenCalledTimes(1)
  })

  test("info pass", (): void => {
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

    expect(infoSpy).toHaveBeenCalledTimes(NUM_TIMES)
  })

  const errorSpy: jest.Mock = spyOn(console, "error")

  test("error fail", (): void => {
    error()

    expect(errorSpy).not.toHaveBeenCalledTimes(1)
  })

  test("error pass", (): void => {
    error(
      "test",
      [
        "me"
      ],
      {
        message: "This is a test",
        name: "TestError"
      } as Error,
      null
    )

    expect(errorSpy).toHaveBeenCalledTimes(NUM_TIMES)
  })
})
