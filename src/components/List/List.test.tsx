import React from 'react';
import { render, screen } from '@testing-library/react';
import List from './index';

test('renders List component with children', () => {
  render(<List><div>Child Element</div></List>);

  const childElement = screen.getByText('Child Element');
  expect(childElement).toBeInTheDocument();
});

test('renders List component with custom class', () => {
  render(<List className="text-red-500">Custom Class</List>);

  const customClass = screen.getByText('Custom Class');
  expect(customClass).toHaveClass('text-red-500 text-slate-50');
});