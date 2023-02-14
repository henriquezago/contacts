import { expect } from '@jest/globals';

import { render, renderHook } from "@testing-library/react";
import ContactModal from './ContactModal';
import { Provider } from 'react-redux';
import { useStore } from '../store';

describe('ContactModal', () => {
  test("renders", () => {
    const contact = {
      id: "1",
      avatar: "",
      name: "John Doe",
      email: "",
      phone: "",
      birthday: "",
      createdAt: "",
    };
    const store = renderHook(() => useStore({
      contact: {
        contacts: [contact],
        isLoading: false,
      }
    }));

    const container = render(
      <Provider store={store.result.current}>
        <ContactModal contact={contact} isVisible={true} onClose={jest.fn()} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});