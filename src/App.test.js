import { render, screen } from '@testing-library/react';
import App from './App';

test('is book search heading present', () => {
  render(<App />);
  const linkElement = screen.getByText("Submit");
  expect(linkElement).toBeInTheDocument();
});
