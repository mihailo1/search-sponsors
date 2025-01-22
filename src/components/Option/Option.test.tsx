import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Option from './index';

test('renders Option component', () => {
  const optionText = 'Test Option';
  render(<Option option={optionText} />);

  const linkElement = screen.getByText(optionText);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute('href', `https://www.google.com/search?q=${optionText}`);
});

test('handles click event', () => {
  const optionText = 'Test Option';
  render(<Option option={optionText} />);

  const linkElement = screen.getByText(optionText);
  fireEvent.click(linkElement);
  expect(linkElement).toHaveAttribute('target', '_blank');
});

test('applies whileTap animation on click', () => {
  const optionText = 'Test Option';
  render(<Option option={optionText} />);

  const linkElement = screen.getByText(optionText);
  fireEvent.mouseDown(linkElement);
  // Check the inline style applied by framer-motion
  expect(linkElement.parentElement?.style.transform).toContain('translateX(-20px) translateZ(0)');
  fireEvent.mouseUp(linkElement);
  // TODO: figure it our
  // expect(linkElement.parentElement?.style.transform).not.toContain('translateX(-20px) translateZ(0)'); 
});
