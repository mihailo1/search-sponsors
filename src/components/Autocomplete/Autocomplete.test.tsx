import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Autocomplete from './index';

// Mock lodash debounce
jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  debounce: jest.fn((fn) => fn),
}));

test('renders Autocomplete component', () => {
  const setTitle = jest.fn();
  render(<Autocomplete setTitle={setTitle} />);

  const input = screen.getByLabelText(/search/i);
  expect(input).toBeInTheDocument();

  act(() => {
    fireEvent.change(input, { target: { value: 'test' } });
  });

  expect(setTitle).toHaveBeenCalledWith('Search Sponsors: test');
});

test('renders options when input changes', async () => {
  const setTitle = jest.fn();
  render(<Autocomplete setTitle={setTitle} />);

  const input = screen.getByLabelText(/search/i);
  
  await act(async () => {
    fireEvent.change(input, { target: { value: 'uber' } });
  });

  await act(async () => {
    const options = await screen.findAllByText((content, element) => {
      return element?.tagName.toLowerCase() === 'a' && content.includes('uber');
    });
    expect(options.length).toBeGreaterThan(0);
  });
});
