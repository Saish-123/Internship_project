import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusBadge, PriorityBadge } from '../components/common/StatusBadge';

describe('StatusBadge', () => {
  it('renders "In Transit" with the Truck icon text', () => {
    render(<StatusBadge status="In Transit" />);
    expect(screen.getByText('In Transit')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Status: In Transit');
  });

  it('renders "Delivered" badge', () => {
    render(<StatusBadge status="Delivered" />);
    expect(screen.getByText('Delivered')).toBeInTheDocument();
  });

  it('renders "Delayed" badge', () => {
    render(<StatusBadge status="Delayed" />);
    expect(screen.getByText('Delayed')).toBeInTheDocument();
  });

  it('renders "Booked" badge as default', () => {
    render(<StatusBadge status="Booked" />);
    expect(screen.getByText('Booked')).toBeInTheDocument();
  });

  it('renders "Out for Delivery" badge', () => {
    render(<StatusBadge status="Out for Delivery" />);
    expect(screen.getByText('Out for Delivery')).toBeInTheDocument();
  });

  it('renders "Inwarded at Hub" badge', () => {
    render(<StatusBadge status="Inwarded at Hub" />);
    expect(screen.getByText('Inwarded at Hub')).toBeInTheDocument();
  });

  it('renders "Exception" badge', () => {
    render(<StatusBadge status="Exception" />);
    expect(screen.getByText('Exception')).toBeInTheDocument();
  });

  it('supports small size variant', () => {
    render(<StatusBadge status="In Transit" size="sm" />);
    const badge = screen.getByRole('status');
    expect(badge.className).toContain('px-2');
  });
});

describe('PriorityBadge', () => {
  it('renders Express priority', () => {
    render(<PriorityBadge priority="Express" />);
    expect(screen.getByText('Express')).toBeInTheDocument();
  });

  it('renders Standard priority', () => {
    render(<PriorityBadge priority="Standard" />);
    expect(screen.getByText('Standard')).toBeInTheDocument();
  });

  it('renders Over-Dimensional (ODC) priority', () => {
    render(<PriorityBadge priority="Over-Dimensional (ODC)" />);
    expect(screen.getByText('ODC (Heavy)')).toBeInTheDocument();
  });

  it('renders Temperature-Controlled priority', () => {
    render(<PriorityBadge priority="Temperature-Controlled" />);
    expect(screen.getByText('Reefer / Cold')).toBeInTheDocument();
  });
});
