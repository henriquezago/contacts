import { expect } from '@jest/globals';

import { act, renderHook } from "@testing-library/react";
import useFilteredContacts from "./useFilteredContacts";

describe("useFilteredContacts", () => {
  it("should filter by name", () => {
    const contacts = [{
      id: "1",
      avatar: "aiaaiai",
      name: "First Contact",
      email: "first@email.com",
      phone: "1234567890",
      birthday: "2021-01-01",
      createdAt: "2021-01-01",
    }, {
      id: "2",
      avatar: "aiaaiai",
      name: "Second Contact",
      email: "second@email.com",
      phone: "1234567890",
      birthday: "2021-01-01",
      createdAt: "2021-01-01",
    }];

    const { result } = renderHook(() => useFilteredContacts(contacts));

    act(() => {
      result.current.setFilter("First Contact");
    })

    expect(result.current.filteredContacts).toEqual([contacts[0]]);
    expect(result.current.filter).toEqual("First Contact");

    act(() => {
      result.current.setFilter("Second Contact");
    })

    expect(result.current.filteredContacts).toEqual([contacts[1]]);
    expect(result.current.filter).toEqual("Second Contact");
  })
})