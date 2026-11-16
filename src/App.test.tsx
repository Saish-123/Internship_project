import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Mumbai Express Freight App', () => {
  it('renders the portal header and skip-link without crashing', async () => {
    render(<App />);
    expect(screen.getByText(/Skip to main content/i)).toBeInTheDocument();
    // Multiple elements match "MUMBAI EXPRESS" (navbar + footer), so use getAllByText
    const brandElements = screen.getAllByText(/MUMBAI EXPRESS/i);
    expect(brandElements.length).toBeGreaterThanOrEqual(1);
  });

  it('has a main content landmark with correct id', () => {
    render(<App />);
    const main = document.getElementById('main-content');
    expect(main).toBeTruthy();
    expect(main!.tagName.toLowerCase()).toBe('main');
  });

  it('contains accessible navigation landmarks', () => {
    render(<App />);
    const navs = screen.getAllByRole('navigation');
    expect(navs.length).toBeGreaterThanOrEqual(1);
  });
});
