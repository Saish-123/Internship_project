import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouteCheckpointStepper } from '../components/tracking/RouteCheckpointStepper';
import { RouteCheckpoint } from '../types/logistics';

const sampleCheckpoints: RouteCheckpoint[] = [
  {
    id: 'cp-1',
    name: 'Bhiwandi Central',
    location: 'Mankoli Logistics Park',
    timestamp: '2026-11-15T10:15:00Z',
    status: 'completed',
    remarks: 'Loaded and sealed',
    lat: 19.2968,
    lng: 73.0631,
  },
  {
    id: 'cp-2',
    name: 'Khalapur Toll',
    location: 'Mumbai-Pune Expressway KM32',
    timestamp: '2026-11-16T09:15:00Z',
    status: 'current',
    remarks: 'Vehicle inspected',
    lat: 18.8252,
    lng: 73.2842,
  },
  {
    id: 'cp-3',
    name: 'Pune Chakan Gate',
    location: 'Bajaj Plant Gate 4B',
    timestamp: '2026-11-16T18:00:00Z',
    status: 'upcoming',
    lat: 18.7606,
    lng: 73.8567,
  },
];

describe('RouteCheckpointStepper', () => {
  it('renders all checkpoint names', () => {
    render(
      <RouteCheckpointStepper
        checkpoints={sampleCheckpoints}
        status="In Transit"
      />
    );
    expect(screen.getByText('Bhiwandi Central')).toBeInTheDocument();
    expect(screen.getByText('Khalapur Toll')).toBeInTheDocument();
    expect(screen.getByText('Pune Chakan Gate')).toBeInTheDocument();
  });

  it('shows "Current Location" tag on active checkpoint', () => {
    render(
      <RouteCheckpointStepper
        checkpoints={sampleCheckpoints}
        status="In Transit"
      />
    );
    expect(screen.getByText('Current Location')).toBeInTheDocument();
  });

  it('shows a progress bar with correct percentage', () => {
    render(
      <RouteCheckpointStepper
        checkpoints={sampleCheckpoints}
        status="In Transit"
      />
    );
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '33');
  });

  it('displays delay reason alert when status is Delayed', () => {
    render(
      <RouteCheckpointStepper
        checkpoints={sampleCheckpoints}
        status="Delayed"
        delayReason="Heavy congestion at Uran flyover"
      />
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/Heavy congestion at Uran flyover/)).toBeInTheDocument();
  });

  it('does not show delay alert for non-delayed status', () => {
    render(
      <RouteCheckpointStepper
        checkpoints={sampleCheckpoints}
        status="In Transit"
      />
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('displays GPS coordinates for each checkpoint', () => {
    render(
      <RouteCheckpointStepper
        checkpoints={sampleCheckpoints}
        status="In Transit"
      />
    );
    expect(screen.getByText(/19.2968° N/)).toBeInTheDocument();
  });

  it('renders remarks text when present', () => {
    render(
      <RouteCheckpointStepper
        checkpoints={sampleCheckpoints}
        status="In Transit"
      />
    );
    expect(screen.getByText('Loaded and sealed')).toBeInTheDocument();
    expect(screen.getByText('Vehicle inspected')).toBeInTheDocument();
  });
});
