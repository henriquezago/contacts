import { expect } from "@jest/globals";
import { renderHook } from "@testing-library/react";

import useDebounce from "./useDebounce";

describe("useDebounce", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should return the same value", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "test", delay: 500 } }
    );

    expect(result.current).toBe("test");

    rerender({ value: "test2", delay: 500 });
    jest.advanceTimersByTime(1);

    expect(result.current).toBe("test");
  });

  it("should return the same value when delay is 0", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "test", delay: 0 } }
    );
    expect(result.current).toBe("test");
    rerender({ value: "test2", delay: 0 });

    expect(result.current).toBe("test");
  });

  it("should return the same value when delay is null", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "test", delay: null } }
    );
    expect(result.current).toBe("test");
    rerender({ value: "test2", delay: null });

    expect(result.current).toBe("test");
  });

  it.skip("should return new value after delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "test", delay: 100 } }
    );

    expect(result.current).toBe("test");

    rerender({ value: "test2", delay: 100 });
    jest.advanceTimersByTime(101);

    expect(result.current).toBe("test2");
  });
});
