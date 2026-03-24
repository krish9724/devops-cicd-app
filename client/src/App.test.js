import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app heading', () => {
  render(<App />);
  const heading = screen.getByText(/CI\/CD Task Manager/i);
  expect(heading).toBeInTheDocument();
});
