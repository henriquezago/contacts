import { expect } from '@jest/globals';
import { fireEvent, render } from "@testing-library/react";

import ContactCard from './ContactCard';
import { act } from '@testing-library/react';

describe('ContactCard', () => {
  const contact = {
    id: "1",
    avatar: "",
    name: "John Doe",
    email: "",
    phone: "",
    birthday: "",
    createdAt: "",
  };

  test("renders", () => {
    const container = render(
      <ContactCard contact={contact} onClick={jest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });

  test("should call onClick", () => {
    const onClick = jest.fn();

    const container = render(
      <ContactCard contact={contact} onClick={onClick} />
    );

    act(() => {
      fireEvent.click(container.getByRole('button'));
    })

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});