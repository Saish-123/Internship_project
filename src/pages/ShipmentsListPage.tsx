import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { 
  fetchShipments, 
  setSearchQuery, 
  setStatusFilter, 
  setOriginFilter, 
  setDestinationFilter, 
  setPriorityFilter, 
  resetFilters, 
  setSortField, 
  setPage, 
  setItemsPerPage,
  toggleErrorSimulation 
} from '../store/shipmentsSlice';
import { StatusBadge, PriorityBadge } from '../components/common/StatusBadge';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorBanner } from '../components/common/ErrorBanner';
import { MUMBAI_HUBS } from '../data/seedShipments';
import { ShipmentStatus, CargoPriority, SortField } from '../types/logistics';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  SlidersHorizontal,
  Bug,
  LayoutGrid,
  List
} from 'lucide-react';

export const ShipmentsListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { 
    items, 
    status, 
    error, 
    filters, 
    sort, 
    pagination, 
    errorSimulationMode 
  } = useAppSelector(state => state.shipments);

  const [compactDensity, setCompactDensity] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Handle URL search parameter if present
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      dispatch(setSearchQuery(q));
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    dispatch(fetchShipments());
  }, [dispatch]);

  // Client-side filtering logic
  const filteredItems = useMemo(() => {
    return items.filter(s => {
      // Search query (ID, LR, sender, receiver, truck, eway bill)
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesId = s.id.toLowerCase().includes(query);
        const matchesLr = s.lrNumber.toLowerCase().includes(query);
        const matchesEway = s.ewayBillNumber.includes(query);
        const matchesConsignor = s.consignor.companyName.toLowerCase().includes(query);
        const matchesConsignee = s.consignee.companyName.toLowerCase().includes(query);
        const matchesTruck = s.driver.vehicleNumber.toLowerCase().includes(query);
        const matchesGoods = s.cargo.goodsType.toLowerCase().includes(query);

        if (!matchesId && !matchesLr && !matchesEway && !matchesConsignor && !matchesConsignee && !matchesTruck && !matchesGoods) {
          return false;
        }
      }

      // Status filter
      if (filters.status !== 'All' && s.status !== filters.status) {
        return false;
      }

      // Origin filter
      if (filters.originHub !== 'All' && s.originHub !== filters.originHub) {
        return false;
      }

      // Destination filter
      if (filters.destinationHub !== 'All' && s.destinationHub !== filters.destinationHub) {
        return false;
      }

      // Priority filter
      if (filters.priority !== 'All' && s.priority !== filters.priority) {
        return false;
      }

      return true;
    });
  }, [items, filters]);

  // Sorting logic
  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      let valA: string | number = '';
      let valB: string | number = '';

      switch (sort.field) {
        case 'createdAt':
          valA = new Date(a.createdAt).getTime();
          valB = new Date(b.createdAt).getTime();
          break;
        case 'estimatedDelivery':
          valA = new Date(a.estimatedDelivery).getTime();
          valB = new Date(b.estimatedDelivery).getTime();
          break;
        case 'weightKg':
          valA = a.cargo.totalWeightKg;
          valB = b.cargo.totalWeightKg;
          break;
        case 'freightAmountInr':
          valA = a.freightAmountInr;
          valB = b.freightAmountInr;
          break;
      }

      if (valA < valB) return sort.order === 'asc' ? -1 : 1;
      if (valA > valB) return sort.order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredItems, sort]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(sortedItems.length / pagination.itemsPerPage));
  const currentPage = Math.min(pagination.currentPage, totalPages);
  const startIndex = (currentPage - 1) * pagination.itemsPerPage;
  const paginatedItems = sortedItems.slice(startIndex, startIndex + pagination.itemsPerPage);

  const statuses: (ShipmentStatus | 'All')[] = [
    'All',
    'In Transit',
    'Out for Delivery',
    'Delayed',
    'Delivered',
    'Inwarded at Hub',
    'Booked'
  ];

  const priorities: (CargoPriority | 'All')[] = [
    'All',
    'Standard',
    'Express',
    'Over-Dimensional (ODC)'
  ];

  const handleSortClick = (field: SortField) => {
    dispatch(setSortField(field));
  };

  const getSortIcon = (field: SortField) => {
    if (sort.field !== field) return <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />;
    return sort.order === 'asc' 
      ? <ArrowUp className="w-3.5 h-3.5 text-amber-500 font-bold" aria-hidden="true" />
      : <ArrowDown className="w-3.5 h-3.5 text-amber-500 font-bold" aria-hidden="true" />;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header with Title and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav aria-label="Breadcrumb" className="text-xs text-slate-500 dark:text-slate-400 mb-1">
            <ol className="flex items-center gap-1.5">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li>&rsaquo;</li>
              <li aria-current="page" className="font-semibold text-slate-800 dark:text-slate-200">Shipments Dashboard</li>
            </ol>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Active Consignments &amp; Bilty Records
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Showing <span className="font-bold text-slate-900 dark:text-white">{sortedItems.length}</span> shipments across Mumbai Metropolitan Region
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Error Injection Toggle for Testing Error State */}
          <button
            type="button"
            onClick={() => {
              dispatch(toggleErrorSimulation());
              dispatch(fetchShipments());
            }}
            title="Toggle simulated network error to inspect error state & retry flow"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
              errorSimulationMode 
                ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 border-rose-400' 
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            <Bug className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Simulate Error: {errorSimulationMode ? 'ON' : 'OFF'}</span>
          </button>

          {/* Density Switcher */}
          <button
            type="button"
            onClick={() => setCompactDensity(!compactDensity)}
            aria-pressed={compactDensity}
            title="Toggle compact table density"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{compactDensity ? 'Compact' : 'Normal'}</span>
          </button>

          {/* View Mode Switcher */}
          <div className="inline-flex rounded-lg border border-slate-300 dark:border-slate-700 p-0.5 bg-white dark:bg-slate-900">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              aria-label="Table view"
              className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              aria-label="Cards view"
              className={`p-1.5 rounded ${viewMode === 'cards' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Multi-faceted Filter & Search Panel */}
      <section 
        className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
        aria-label="Shipment filters and search"
      >
        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
          <label htmlFor="shipments-search" className="sr-only">Search Consignments</label>
          <input
            id="shipments-search"
            type="text"
            value={filters.searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder="Search by Tracking ID (MFX-...), LR Bilty #, Consignor/Consignee name, or Truck #..."
            className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:bg-white"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => dispatch(setSearchQuery(''))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Status:</span>
          </span>
          {statuses.map(st => (
            <button
              key={st}
              type="button"
              onClick={() => dispatch(setStatusFilter(st))}
              className={`px-2.5 py-1 text-xs rounded-full font-medium transition-colors ${
                filters.status === st
                  ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Additional Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-slate-100 dark:border-slate-800">
          <div>
            <label htmlFor="origin-hub-filter" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Origin Hub
            </label>
            <select
              id="origin-hub-filter"
              value={filters.originHub}
              onChange={(e) => dispatch(setOriginFilter(e.target.value))}
              className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-2 text-slate-900 dark:text-white focus:ring-1 focus:ring-amber-500"
            >
              <option value="All">All Origin Hubs</option>
              {MUMBAI_HUBS.map(hub => (
                <option key={hub} value={hub}>{hub}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="dest-hub-filter" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Destination Hub
            </label>
            <select
              id="dest-hub-filter"
              value={filters.destinationHub}
              onChange={(e) => dispatch(setDestinationFilter(e.target.value))}
              className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-2 text-slate-900 dark:text-white focus:ring-1 focus:ring-amber-500"
            >
              <option value="All">All Destinations</option>
              {MUMBAI_HUBS.map(hub => (
                <option key={hub} value={hub}>{hub}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="priority-filter" className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Cargo Priority
            </label>
            <select
              id="priority-filter"
              value={filters.priority}
              onChange={(e) => dispatch(setPriorityFilter(e.target.value as CargoPriority | 'All'))}
              className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-2 text-slate-900 dark:text-white focus:ring-1 focus:ring-amber-500"
            >
              {priorities.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Reset Filter Button */}
        {(filters.searchQuery || filters.status !== 'All' || filters.originHub !== 'All' || filters.destinationHub !== 'All' || filters.priority !== 'All') && (
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={() => dispatch(resetFilters())}
              className="inline-flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 hover:underline font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset All Active Filters</span>
            </button>
          </div>
        )}
      </section>

      {/* Main Content Area: Loading / Error / Empty / Data */}
      {status === 'loading' ? (
        <LoadingSkeleton count={4} view={viewMode} />
      ) : status === 'failed' ? (
        <ErrorBanner
          message={error || 'Unable to communicate with the Mumbai freight gateway.'}
          onRetry={() => {
            if (errorSimulationMode) {
              dispatch(toggleErrorSimulation());
            }
            dispatch(fetchShipments());
          }}
        />
      ) : sortedItems.length === 0 ? (
        <EmptyState
          title="No consignments matched your filters"
          description="We couldn't find any shipments matching your exact search, status, or hub filter combination. Try resetting your filters to see all shipments."
          onReset={() => dispatch(resetFilters())}
        />
      ) : viewMode === 'table' ? (
        /* Responsive Desktop Table */
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" aria-label="Consignments list">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <th scope="col" className={`${compactDensity ? 'py-2 px-3' : 'py-3.5 px-4'}`}>
                    <button
                      type="button"
                      onClick={() => handleSortClick('createdAt')}
                      className="inline-flex items-center gap-1 hover:text-slate-900 dark:hover:text-white"
                    >
                      <span>Consignment ID &amp; Bilty</span>
                      {getSortIcon('createdAt')}
                    </button>
                  </th>
                  <th scope="col" className={`${compactDensity ? 'py-2 px-3' : 'py-3.5 px-4'}`}>
                    Sender &rarr; Consignee
                  </th>
                  <th scope="col" className={`${compactDensity ? 'py-2 px-3' : 'py-3.5 px-4'}`}>
                    <button
                      type="button"
                      onClick={() => handleSortClick('weightKg')}
                      className="inline-flex items-center gap-1 hover:text-slate-900 dark:hover:text-white"
                    >
                      <span>Cargo Manifest</span>
                      {getSortIcon('weightKg')}
                    </button>
                  </th>
                  <th scope="col" className={`${compactDensity ? 'py-2 px-3' : 'py-3.5 px-4'}`}>
                    Status &amp; Location
                  </th>
                  <th scope="col" className={`${compactDensity ? 'py-2 px-3' : 'py-3.5 px-4'}`}>
                    <button
                      type="button"
                      onClick={() => handleSortClick('estimatedDelivery')}
                      className="inline-flex items-center gap-1 hover:text-slate-900 dark:hover:text-white"
                    >
                      <span>ETA / Delivered</span>
                      {getSortIcon('estimatedDelivery')}
                    </button>
                  </th>
                  <th scope="col" className={`${compactDensity ? 'py-2 px-3' : 'py-3.5 px-4'} text-right`}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {paginatedItems.map(shipment => (
                  <tr 
                    key={shipment.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    {/* ID & LR */}
                    <td className={`${compactDensity ? 'py-2.5 px-3' : 'py-3.5 px-4'}`}>
                      <Link 
                        to={`/shipments/${shipment.id}`} 
                        className="font-mono font-bold text-amber-600 dark:text-amber-400 hover:underline block"
                      >
                        {shipment.id}
                      </Link>
                      <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        LR: {shipment.lrNumber}
                      </div>
                    </td>

                    {/* Consignor -> Consignee (Handles Edge Case: Very Long Names) */}
                    <td className={`${compactDensity ? 'py-2.5 px-3' : 'py-3.5 px-4'} max-w-xs`}>
                      <div 
                        className="font-bold text-slate-800 dark:text-slate-200 truncate"
                        title={shipment.consignor.companyName}
                      >
                        {shipment.consignor.companyName}
                      </div>
                      <div 
                        className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5"
                        title={shipment.consignee.companyName}
                      >
                        &rarr; {shipment.consignee.companyName}
                      </div>
                    </td>

                    {/* Cargo */}
                    <td className={`${compactDensity ? 'py-2.5 px-3' : 'py-3.5 px-4'}`}>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {shipment.cargo.totalWeightKg.toLocaleString()} kg
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[180px]">
                        {shipment.cargo.goodsType}
                      </div>
                    </td>

                    {/* Status & Location */}
                    <td className={`${compactDensity ? 'py-2.5 px-3' : 'py-3.5 px-4'}`}>
                      <StatusBadge status={shipment.status} size="sm" />
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 truncate max-w-[200px]" title={shipment.currentLocation}>
                        {shipment.currentLocation}
                      </div>
                    </td>

                    {/* ETA / Delivered */}
                    <td className={`${compactDensity ? 'py-2.5 px-3' : 'py-3.5 px-4'} font-mono text-[11px] text-slate-600 dark:text-slate-400`}>
                      {shipment.actualDelivery ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                          {new Date(shipment.actualDelivery).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      ) : (
                        <span>
                          {new Date(shipment.estimatedDelivery).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className={`${compactDensity ? 'py-2.5 px-3' : 'py-3.5 px-4'} text-right`}>
                      <Link
                        to={`/shipments/${shipment.id}`}
                        aria-label={`View consignment details for ${shipment.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 dark:hover:bg-amber-500 dark:hover:text-slate-950 text-slate-700 dark:text-slate-300 font-bold transition-colors"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Mobile / Cards View */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {paginatedItems.map(shipment => (
            <div 
              key={shipment.id}
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <Link 
                    to={`/shipments/${shipment.id}`}
                    className="font-mono font-bold text-sm text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    {shipment.id}
                  </Link>
                  <p className="font-mono text-xs text-slate-500">LR: {shipment.lrNumber}</p>
                </div>
                <StatusBadge status={shipment.status} size="sm" />
              </div>

              <div className="space-y-1 text-xs">
                <div className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                  From: {shipment.consignor.companyName}
                </div>
                <div className="text-slate-600 dark:text-slate-400 line-clamp-1">
                  To: {shipment.consignee.companyName}
                </div>
              </div>

              <div className="text-xs bg-slate-50 dark:bg-slate-800/60 p-2 rounded flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Weight: <strong>{shipment.cargo.totalWeightKg.toLocaleString()} kg</strong></span>
                <PriorityBadge priority={shipment.priority} />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 truncate max-w-[180px]">
                  {shipment.currentLocation}
                </span>
                <Link
                  to={`/shipments/${shipment.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Accessible Pagination Controls */}
      {sortedItems.length > 0 && (
        <div 
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400"
          role="navigation"
          aria-label="Shipments table pagination"
        >
          {/* Items info */}
          <div>
            Showing <span className="font-bold text-slate-900 dark:text-white">{startIndex + 1}</span> to{' '}
            <span className="font-bold text-slate-900 dark:text-white">
              {Math.min(startIndex + pagination.itemsPerPage, sortedItems.length)}
            </span> of{' '}
            <span className="font-bold text-slate-900 dark:text-white">{sortedItems.length}</span> shipments
          </div>

          <div className="flex items-center gap-4">
            {/* Rows per page selector */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="rows-per-page">Rows per page:</label>
              <select
                id="rows-per-page"
                value={pagination.itemsPerPage}
                onChange={(e) => dispatch(setItemsPerPage(Number(e.target.value)))}
                className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs text-slate-900 dark:text-white focus:ring-1 focus:ring-amber-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>

            {/* Pagination buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => dispatch(setPage(Math.max(1, currentPage - 1)))}
                disabled={currentPage <= 1}
                aria-label="Previous page"
                className="p-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-2 font-mono font-semibold text-slate-900 dark:text-white">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                onClick={() => dispatch(setPage(Math.min(totalPages, currentPage + 1)))}
                disabled={currentPage >= totalPages}
                aria-label="Next page"
                className="p-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
