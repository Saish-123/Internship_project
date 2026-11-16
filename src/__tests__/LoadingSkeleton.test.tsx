import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';

describe('LoadingSkeleton', () => {
  it('renders with aria-busy and status role', () => {
    render(<LoadingSkeleton />);
    const el = screen.getByRole('status');
    expect(el).toHaveAttribute('aria-busy', 'true');
  });

  it('renders a screen-reader description', () => {
    render(<LoadingSkeleton />);
    expect(screen.getByText('Loading consignments and tracking details...')).toBeInTheDocument();
  });

  it('defaults to table view with 4 skeleton rows', () => {
    const { container } = render(<LoadingSkeleton count={4} view="table" />);
    // Table view renders a single wrapper with divided children
    const wrapper = container.querySelector('.divide-y');
    expect(wrapper).toBeTruthy();
    expect(wrapper!.children.length).toBe(4);
  });

  it('renders card view with the specified count', () => {
    const { container } = render(<LoadingSkeleton count={3} view="cards" />);
    const grid = container.querySelector('.grid');
    expect(grid).toBeTruthy();
    expect(grid!.children.length).toBe(3);
  });
});
