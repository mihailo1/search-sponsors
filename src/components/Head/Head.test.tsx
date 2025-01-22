import React from 'react';
import { render } from '@testing-library/react';
import Head from './index';

jest.mock('next/head', () => {
  return ({ children }: { children: React.ReactNode }) => <>{children}</>;
});

test('renders Head component with title and description', () => {
  const title = 'Test Title';
  const description = 'Test Description';
  render(<Head title={title} description={description} />);

  expect(document.title).toBe(title);
  const metaDescription = document.querySelector('meta[name="description"]');
  expect(metaDescription).toHaveAttribute('content', description);
});

test('renders Head component with default title and description', () => {
  render(<Head title="Sponsor Search" description="Search for sponsors by name, industry, and location." />);

  expect(document.title).toBe('Sponsor Search');
  const metaDescription = document.querySelector('meta[name="description"]');
  expect(metaDescription).toHaveAttribute('content', 'Search for sponsors by name, industry, and location.');
});