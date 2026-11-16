import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkipLink } from '../components/common/SkipLink';

describe('SkipLink', () => {
  it('renders the skip-to-content link', () => {
    render(<SkipLink />);
    const link = screen.getByText('Skip to main content');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('has the skip-link CSS class for off-screen positioning', () => {
    render(<SkipLink />);
    const link = screen.getByText('Skip to main content');
    expect(link.className).toContain('skip-link');
  });
});
