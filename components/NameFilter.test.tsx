import { expect } from '@jest/globals';
import { act, fireEvent, render } from "@testing-library/react";

import NameFilter, { DEBOUNCE_DELAY } from "./NameFilter";

describe('NameFilter', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should render', () => {
    const { container } = render(<NameFilter onChange={jest.fn()} filter="" />);
    expect(container).toMatchSnapshot();
  });

  it('should call onChange after delay', () => {
    const onChange = jest.fn();
    const { container } = render(<NameFilter onChange={onChange} filter="" />);

    act(() => {
      const inputElement = container.querySelector("#name-filter");
      fireEvent.change(inputElement, { target: { value: 'test' } });
      
      jest.advanceTimersByTime(DEBOUNCE_DELAY + 1);
    });


    expect(onChange).toHaveBeenCalledWith('test');
  });
});