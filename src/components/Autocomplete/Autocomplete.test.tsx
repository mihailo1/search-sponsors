import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Autocomplete from './index';

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  debounce: jest.fn((fn) => fn),
}));

test('renders Autocomplete component', () => {
  const setTitle = jest.fn();
  render(<Autocomplete setTitle={setTitle} />);

  const input = screen.getByLabelText(/search/i);
  expect(input).toBeInTheDocument();

  fireEvent.change(input, { target: { value: 'test' } });

  expect(setTitle).toHaveBeenCalledWith('Search Sponsors: test');
});

test('renders options when input changes', async () => {
  const setTitle = jest.fn();
  render(<Autocomplete setTitle={setTitle} />);

  const input = screen.getByLabelText(/search/i);
  fireEvent.change(input, { target: { value: 'test' } });

  const options = await screen.findAllByText((content, element) => {
    return element?.tagName.toLowerCase() === 'a' && content.includes('test');
  });
  expect(options.length).toBeGreaterThan(0);
});
