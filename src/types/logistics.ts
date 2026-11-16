export type ShipmentStatus = 
  | 'Booked' 
  | 'Inwarded at Hub' 
  | 'In Transit' 
  | 'Out for Delivery' 
  | 'Delivered' 
  | 'Delayed' 
  | 'Exception';

export type CargoPriority = 'Standard' | 'Express' | 'Over-Dimensional (ODC)' | 'Temperature-Controlled';

export interface RouteCheckpoint {
  id: string;
  name: string;
  location: string;
  timestamp: string;
  status: 'completed' | 'current' | 'upcoming';
  remarks?: string;
  lat: number;
  lng: number;
}

export interface ProofOfDelivery {
  receivedBy: string;
  relation: 'Security Guard' | 'Store Manager' | 'Consignee Staff' | 'Direct Recipient';
  signatureUrl?: string; // might be missing
  photoUrl?: string;     // might be missing
  deliveredAt: string;
  deliveryNotes?: string;
  otpVerified: boolean;
  biltyStamped: boolean;
}

export interface DriverDetails {
  name: string;
  phone: string;
  licenseNumber: string;
  vehicleNumber: string; // e.g. MH-04-GP-8291
  truckModel: string;
  avatarUrl?: string; // might be missing
}

export interface PartyDetails {
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  gstin: string;
}

export interface CargoItem {
  id: string;
  description: string;
  quantity: number;
  packageType: 'Wooden Crates' | 'Corrugated Boxes' | 'Steel Drums' | 'Pallets' | 'Loose Coils';
  weightKg: number;
  declaredValueInr: number;
}

export interface Shipment {
  id: string; // e.g. "MFX-2026-BHW-08942"
  lrNumber: string; // Bilty / Lorry Receipt number e.g. "LR-MH-98124"
  ewayBillNumber: string; // e.g. "541098234190"
  status: ShipmentStatus;
  priority: CargoPriority;
  originHub: string;
  destinationHub: string;
  currentLocation: string;
  createdAt: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  consignor: PartyDetails;
  consignee: PartyDetails;
  cargo: {
    items: CargoItem[];
    totalWeightKg: number;
    totalVolumeCft?: number;
    goodsType: string;
    specialHandlingNotes?: string;
  };
  driver: DriverDetails;
  checkpoints: RouteCheckpoint[];
  pod?: ProofOfDelivery;
  delayReason?: string;
  tollChargesEstimatedInr: number;
  freightAmountInr: number;
  gstAmountInr: number;
}

export interface ShipmentFilters {
  searchQuery: string;
  status: ShipmentStatus | 'All';
  originHub: string | 'All';
  destinationHub: string | 'All';
  priority: CargoPriority | 'All';
  dateRange: 'all' | 'today' | 'this_week' | 'this_month';
}

export type SortField = 'createdAt' | 'estimatedDelivery' | 'weightKg' | 'freightAmountInr';
export type SortOrder = 'asc' | 'desc';

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}
