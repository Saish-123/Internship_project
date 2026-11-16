import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmptyState } from '../components/common/EmptyState';

describe('EmptyState', () => {
  it('renders the default empty state title and description', () => {
    render(<EmptyState />);
    expect(screen.getByText('No shipments found')).toBeInTheDocument();
    expect(screen.getByText(/No consignments match/i)).toBeInTheDocument();
  });

  it('renders custom title and description', () => {
    render(
      <EmptyState
        title="Nothing here"
        description="Custom message for empty state"
      />
    );
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
    expect(screen.getByText('Custom message for empty state')).toBeInTheDocument();
  });

  it('shows reset button when onReset is provided', () => {
    const handleReset = vi.fn();
    render(<EmptyState onReset={handleReset} />);
    expect(screen.getByText('Reset All Filters')).toBeInTheDocument();
  });

  it('calls onReset when the reset button is clicked', async () => {
    const user = userEvent.setup();
    const handleReset = vi.fn();
    render(<EmptyState onReset={handleReset} actionText="Clear Filters" />);

    await user.click(screen.getByText('Clear Filters'));
    expect(handleReset).toHaveBeenCalledTimes(1);
  });

  it('does not show a reset button when onReset is not provided', () => {
    render(<EmptyState />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
