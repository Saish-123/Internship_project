import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBanner } from '../components/common/ErrorBanner';

describe('ErrorBanner', () => {
  it('renders the error message with alert role', () => {
    render(<ErrorBanner message="Network timeout at Bhiwandi gateway" />);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(screen.getByText('Network timeout at Bhiwandi gateway')).toBeInTheDocument();
  });

  it('renders a custom title', () => {
    render(<ErrorBanner message="500 Internal" title="Server Error" />);
    expect(screen.getByText('Server Error')).toBeInTheDocument();
  });

  it('shows the retry button when onRetry is provided', () => {
    const handleRetry = vi.fn();
    render(<ErrorBanner message="Gateway error" onRetry={handleRetry} />);
    expect(screen.getByText('Retry Request')).toBeInTheDocument();
  });

  it('calls onRetry when the retry button is clicked', async () => {
    const user = userEvent.setup();
    const handleRetry = vi.fn();
    render(<ErrorBanner message="Timeout" onRetry={handleRetry} />);

    await user.click(screen.getByText('Retry Request'));
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it('does not show retry button when onRetry is omitted', () => {
    render(<ErrorBanner message="Something failed" />);
    expect(screen.queryByText('Retry Request')).not.toBeInTheDocument();
  });
});
