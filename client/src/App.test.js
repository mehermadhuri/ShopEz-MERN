import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ShopEz navbar brand', () => {
  render(<App />);
  const brandElement = screen.getByText(/ShopEz/i);
  expect(brandElement).toBeInTheDocument();
});
