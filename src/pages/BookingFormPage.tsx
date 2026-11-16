import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { createNewShipment } from '../store/shipmentsSlice';
import { addToast } from '../store/uiSlice';
import { MUMBAI_HUBS } from '../data/seedShipments';
import { CargoPriority } from '../types/logistics';
import { 
  Building2, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  FileText, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  Package
} from 'lucide-react';

interface FormData {
  // Step 1: Parties
  consignorName: string;
  consignorPerson: string;
  consignorPhone: string;
  consignorEmail: string;
  consignorAddress: string;
  consignorCity: string;
  consignorPincode: string;
  consignorGstin: string;
  originHub: string;

  consigneeName: string;
  consigneePerson: string;
  consigneePhone: string;
  consigneeEmail: string;
  consigneeAddress: string;
  consigneeCity: string;
  consigneePincode: string;
  consigneeGstin: string;
  destinationHub: string;

  // Step 2: Cargo & Vehicle
  goodsType: string;
  packageType: 'Wooden Crates' | 'Corrugated Boxes' | 'Steel Drums' | 'Pallets' | 'Loose Coils';
  quantity: number;
  weightKg: number;
  declaredValueInr: number;
  specialHandlingNotes: string;
  priority: CargoPriority;
  truckModel: string;

  // Step 3: Security & Driver
  ewayBillNumber: string;
  driverName: string;
  driverPhone: string;
  driverLicense: string;
  vehicleNumber: string;
  requireOtp: boolean;
  requireSignature: boolean;
}

const initialForm: FormData = {
  consignorName: 'Tata Steel Processing & Distribution Ltd',
  consignorPerson: 'Anand K. Kulkarni',
  consignorPhone: '+91 98201 55920',
  consignorEmail: 'dispatch@tatasteel-mumbai.example.com',
  consignorAddress: 'Godown 18, Mankoli Logistics Corridor',
  consignorCity: 'Bhiwandi, Thane',
  consignorPincode: '421302',
  consignorGstin: '27AAACT2727Q1ZT',
  originHub: 'Bhiwandi Central SuperHub',

  consigneeName: 'Thermax Heavy Engineering Fab Plant',
  consigneePerson: 'Milind S. Joshi',
  consigneePhone: '+91 98223 88102',
  consigneeEmail: 'inward.gate2@thermax.example.com',
  consigneeAddress: 'Plot 45, MIDC Bhosari Industrial Area',
  consigneeCity: 'Pune',
  consigneePincode: '411026',
  consigneeGstin: '27AAACT0092P1ZZ',
  destinationHub: 'Pune Chakan Auto Cluster Link',

  goodsType: 'High-Tensile Cold Rolled Steel Sheets',
  packageType: 'Pallets',
  quantity: 20,
  weightKg: 8500,
  declaredValueInr: 2400000,
  specialHandlingNotes: 'Use heavy-duty corner protectors and moisture barriers.',
  priority: 'Express',
  truckModel: 'BharatBenz 2823C Heavy Hauler (6x4)',

  ewayBillNumber: '541098772091',
  driverName: 'Eknath Vitthal Shinde',
  driverPhone: '+91 98690 12844',
  driverLicense: 'MH-04-2016-0099120',
  vehicleNumber: 'MH-04-ER-9912',
  requireOtp: true,
  requireSignature: true,
};

export const BookingFormPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { number: 1, title: 'Parties Details', description: 'Consignor & Consignee' },
    { number: 2, title: 'Cargo & Vehicle', description: 'Weight, Hauler & Goods' },
    { number: 3, title: 'Compliance & Driver', description: 'E-Way Bill & Security' },
    { number: 4, title: 'Review & Bilty', description: 'Summary & Confirmation' },
  ];

  const updateField = (field: keyof FormData, value: string | number | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!form.consignorName.trim()) newErrors.consignorName = 'Shipper/Consignor name is required.';
      if (!form.consignorPhone.trim()) newErrors.consignorPhone = 'Shipper contact phone is required.';
      if (!form.consignorAddress.trim()) newErrors.consignorAddress = 'Shipper pickup address is required.';
      if (!form.consignorGstin.trim()) {
        newErrors.consignorGstin = 'Shipper GSTIN is required.';
      } else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(form.consignorGstin.trim())) {
        newErrors.consignorGstin = 'Invalid Indian GSTIN format (e.g. 27AAAAA0000A1Z5).';
      }

      if (!form.consigneeName.trim()) newErrors.consigneeName = 'Consignee receiver company name is required.';
      if (!form.consigneePhone.trim()) newErrors.consigneePhone = 'Consignee phone number is required.';
      if (!form.consigneeAddress.trim()) newErrors.consigneeAddress = 'Consignee delivery address is required.';
      if (!form.consigneeGstin.trim()) {
        newErrors.consigneeGstin = 'Consignee GSTIN is required.';
      }
    } else if (step === 2) {
      if (!form.goodsType.trim()) newErrors.goodsType = 'Goods description / category is required.';
      if (!form.weightKg || form.weightKg <= 0) newErrors.weightKg = 'Total weight in kg must be greater than 0.';
      if (!form.quantity || form.quantity <= 0) newErrors.quantity = 'Package quantity must be at least 1.';
      if (!form.declaredValueInr || form.declaredValueInr <= 0) newErrors.declaredValueInr = 'Declared consignment value in ₹ is required.';
      if (!form.truckModel.trim()) newErrors.truckModel = 'Truck hauler type is required.';
    } else if (step === 3) {
      if (!form.ewayBillNumber.trim()) {
        newErrors.ewayBillNumber = '12-digit GST E-Way Bill Number is required for freight haulage.';
      } else if (!/^\d{12}$/.test(form.ewayBillNumber.trim())) {
        newErrors.ewayBillNumber = 'E-Way bill number must be exactly 12 numeric digits.';
      }
      if (!form.driverName.trim()) newErrors.driverName = 'Assigned driver name is required.';
      if (!form.driverPhone.trim()) newErrors.driverPhone = 'Driver phone number is required.';
      if (!form.vehicleNumber.trim()) newErrors.vehicleNumber = 'Truck registration number (e.g. MH-04-ER-9912) is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(steps.length, prev + 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pricing calculations
  const estimatedFreight = Math.round(form.weightKg * 4.8 + 8000);
  const estimatedTolls = 1650;
  const gstAmount = Math.round((estimatedFreight + estimatedTolls) * 0.12);
  const totalAmount = estimatedFreight + estimatedTolls + gstAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    try {
      const created = await dispatch(createNewShipment({
        ewayBillNumber: form.ewayBillNumber.trim(),
        priority: form.priority,
        originHub: form.originHub,
        destinationHub: form.destinationHub,
        currentLocation: form.originHub,
        estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        consignor: {
          companyName: form.consignorName.trim(),
          contactPerson: form.consignorPerson.trim(),
          phone: form.consignorPhone.trim(),
          email: form.consignorEmail.trim(),
          address: form.consignorAddress.trim(),
          city: form.consignorCity.trim(),
          pincode: form.consignorPincode.trim(),
          gstin: form.consignorGstin.trim(),
        },
        consignee: {
          companyName: form.consigneeName.trim(),
          contactPerson: form.consigneePerson.trim(),
          phone: form.consigneePhone.trim(),
          email: form.consigneeEmail.trim(),
          address: form.consigneeAddress.trim(),
          city: form.consigneeCity.trim(),
          pincode: form.consigneePincode.trim(),
          gstin: form.consigneeGstin.trim(),
        },
        cargo: {
          items: [
            {
              id: `item-${Date.now()}`,
              description: form.goodsType.trim(),
              quantity: form.quantity,
              packageType: form.packageType,
              weightKg: form.weightKg,
              declaredValueInr: form.declaredValueInr,
            }
          ],
          totalWeightKg: form.weightKg,
          goodsType: form.goodsType.trim(),
          specialHandlingNotes: form.specialHandlingNotes.trim() || undefined,
        },
        driver: {
          name: form.driverName.trim(),
          phone: form.driverPhone.trim(),
          licenseNumber: form.driverLicense.trim(),
          vehicleNumber: form.vehicleNumber.trim().toUpperCase(),
          truckModel: form.truckModel.trim(),
        },
        freightAmountInr: estimatedFreight,
        tollChargesEstimatedInr: estimatedTolls,
        gstAmountInr: gstAmount,
      })).unwrap();

      dispatch(addToast({
        type: 'success',
        title: 'Consignment Bilty Generated',
        message: `Successfully booked shipment ${created.id}. Assigned to driver ${created.driver.name}.`
      }));

      navigate(`/shipments/${created.id}`);
    } catch {
      dispatch(addToast({
        type: 'error',
        title: 'Booking Failed',
        message: 'Could not create consignment. Please verify all fields and retry.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Book New Consignment (Bilty Dispatch)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Generate an electronic Lorry Receipt (LR) with automated GST E-Way Bill integration and driver dispatch.
        </p>
      </div>

      {/* Progress Stepper with Keyboard and ARIA Support */}
      <nav aria-label="Booking multi-step progress" className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <ol className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {steps.map(step => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            return (
              <li 
                key={step.number}
                aria-current={isCurrent ? 'step' : undefined}
                className={`relative flex items-center gap-3 p-2.5 rounded-xl border transition-colors ${
                  isCurrent 
                    ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200' 
                    : isCompleted 
                    ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/10 text-emerald-900 dark:text-emerald-200' 
                    : 'border-slate-200 dark:border-slate-800 text-slate-400'
                }`}
              >
                <div 
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                    isCurrent 
                      ? 'bg-amber-500 text-slate-950' 
                      : isCompleted 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}
                  aria-hidden="true"
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : step.number}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold truncate leading-tight">{step.title}</div>
                  <div className="text-[10px] text-slate-400 truncate hidden sm:block">{step.description}</div>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Error Summary Banner (WCAG 2.1 Error Handling) */}
      {Object.keys(errors).length > 0 && (
        <div 
          role="alert" 
          aria-live="assertive"
          className="p-4 bg-rose-50 dark:bg-rose-950/60 border-2 border-rose-400 dark:border-rose-800 rounded-xl text-rose-900 dark:text-rose-200 text-xs space-y-1.5 shadow-sm"
        >
          <div className="flex items-center gap-2 font-bold text-sm text-rose-950 dark:text-rose-100">
            <AlertCircle className="w-4 h-4 text-rose-600" aria-hidden="true" />
            <span>Please correct the errors in Step {currentStep} before proceeding:</span>
          </div>
          <ul className="list-disc list-inside space-y-0.5 pl-2 text-rose-800 dark:text-rose-300">
            {Object.entries(errors).map(([key, msg]) => (
              <li key={key}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Form Steps */}
      <form onSubmit={handleSubmit} noValidate>
        {/* STEP 1: Parties Information */}
        {currentStep === 1 && (
          <section className="space-y-6 animate-in fade-in duration-150" aria-labelledby="step1-heading">
            <h2 id="step1-heading" className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-500" aria-hidden="true" />
              <span>Step 1: Consignor (Shipper) &amp; Consignee (Receiver) Details</span>
            </h2>

            {/* Consignor Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Shipper / Consignor (Pickup Location)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="consignorName" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Company / Shipper Legal Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="consignorName"
                    type="text"
                    required
                    aria-invalid={!!errors.consignorName}
                    value={form.consignorName}
                    onChange={(e) => updateField('consignorName', e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label htmlFor="consignorGstin" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Shipper GSTIN (15-digit) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="consignorGstin"
                    type="text"
                    required
                    aria-invalid={!!errors.consignorGstin}
                    placeholder="27AAAAA0000A1Z5"
                    value={form.consignorGstin}
                    onChange={(e) => updateField('consignorGstin', e.target.value.toUpperCase())}
                    className="w-full text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white uppercase focus:ring-2 focus:ring-amber-500"
                  />
                  {errors.consignorGstin && (
                    <p className="mt-1 text-xs text-rose-500">{errors.consignorGstin}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="originHub" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Origin Hub Dispatch Gate <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="originHub"
                    value={form.originHub}
                    onChange={(e) => updateField('originHub', e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                  >
                    {MUMBAI_HUBS.map(hub => (
                      <option key={hub} value={hub}>{hub}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="consignorPerson" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Contact Person
                  </label>
                  <input
                    id="consignorPerson"
                    type="text"
                    value={form.consignorPerson}
                    onChange={(e) => updateField('consignorPerson', e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="consignorPhone" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="consignorPhone"
                    type="tel"
                    required
                    aria-invalid={!!errors.consignorPhone}
                    value={form.consignorPhone}
                    onChange={(e) => updateField('consignorPhone', e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="consignorAddress" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Pickup Street Address &amp; Industrial Estate <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="consignorAddress"
                    type="text"
                    required
                    aria-invalid={!!errors.consignorAddress}
                    value={form.consignorAddress}
                    onChange={(e) => updateField('consignorAddress', e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Consignee Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Consignee / Destination Receiver
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="consigneeName" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Consignee Company Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="consigneeName"
                    type="text"
                    required
                    aria-invalid={!!errors.consigneeName}
                    value={form.consigneeName}
                    onChange={(e) => updateField('consigneeName', e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label htmlFor="consigneeGstin" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Consignee GSTIN <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="consigneeGstin"
                    type="text"
                    required
                    aria-invalid={!!errors.consigneeGstin}
                    value={form.consigneeGstin}
                    onChange={(e) => updateField('consigneeGstin', e.target.value.toUpperCase())}
                    className="w-full text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white uppercase focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label htmlFor="destinationHub" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Destination Hub Corridor <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="destinationHub"
                    value={form.destinationHub}
                    onChange={(e) => updateField('destinationHub', e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                  >
                    {MUMBAI_HUBS.map(hub => (
                      <option key={hub} value={hub}>{hub}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="consigneePerson" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Receiving Manager Name
                  </label>
                  <input
                    id="consigneePerson"
                    type="text"
                    value={form.consigneePerson}
                    onChange={(e) => updateField('consigneePerson', e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="consigneePhone" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Consignee Contact Phone <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="consigneePhone"
                    type="tel"
                    required
                    aria-invalid={!!errors.consigneePhone}
                    value={form.consigneePhone}
                    onChange={(e) => updateField('consigneePhone', e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="consigneeAddress" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Delivery Address &amp; Unloading Dock <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="consigneeAddress"
                    type="text"
                    required
                    aria-invalid={!!errors.consigneeAddress}
                    value={form.consigneeAddress}
                    onChange={(e) => updateField('consigneeAddress', e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* STEP 2: Cargo & Vehicle Specifications */}
        {currentStep === 2 && (
          <section className="space-y-6 animate-in fade-in duration-150" aria-labelledby="step2-heading">
            <h2 id="step2-heading" className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-amber-500" aria-hidden="true" />
              <span>Step 2: Cargo Manifest &amp; Haulage Vehicle</span>
            </h2>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="goodsType" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Goods Classification &amp; Description <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="goodsType"
                    type="text"
                    required
                    aria-invalid={!!errors.goodsType}
                    placeholder="e.g. Precision Automotive Axles / Cold-Rolled Steel Coils"
                    value={form.goodsType}
                    onChange={(e) => updateField('goodsType', e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label htmlFor="weightKg" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Gross Weight (in kg) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="weightKg"
                    type="number"
                    min="1"
                    required
                    aria-invalid={!!errors.weightKg}
                    value={form.weightKg}
                    onChange={(e) => updateField('weightKg', Number(e.target.value))}
                    className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Package Units Count <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    required
                    aria-invalid={!!errors.quantity}
                    value={form.quantity}
                    onChange={(e) => updateField('quantity', Number(e.target.value))}
                    className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label htmlFor="packageType" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Packaging Type
                  </label>
                  <select
                    id="packageType"
                    value={form.packageType}
                    onChange={(e) => updateField('packageType', e.target.value as FormData['packageType'])}
                    className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white"
                  >
                    <option value="Pallets">Pallets (Shrink Wrapped)</option>
                    <option value="Wooden Crates">Wooden Crates (ISPM-15 Certified)</option>
                    <option value="Steel Drums">Steel Drums</option>
                    <option value="Corrugated Boxes">Heavy Corrugated Boxes</option>
                    <option value="Loose Coils">Loose Steel Coils</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="declaredValueInr" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Declared Value for Marine Insurance (₹) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="declaredValueInr"
                    type="number"
                    min="1000"
                    required
                    aria-invalid={!!errors.declaredValueInr}
                    value={form.declaredValueInr}
                    onChange={(e) => updateField('declaredValueInr', Number(e.target.value))}
                    className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label htmlFor="priority" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Service Priority
                  </label>
                  <select
                    id="priority"
                    value={form.priority}
                    onChange={(e) => updateField('priority', e.target.value as CargoPriority)}
                    className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white"
                  >
                    <option value="Express">Express Haulage (Non-stop transit)</option>
                    <option value="Standard">Standard Scheduled Freight</option>
                    <option value="Over-Dimensional (ODC)">Over-Dimensional Cargo (Pilot escort)</option>
                    <option value="Temperature-Controlled">Temperature-Controlled Reefer</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="truckModel" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Assigned Truck Model <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="truckModel"
                    value={form.truckModel}
                    onChange={(e) => updateField('truckModel', e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white"
                  >
                    <option value="BharatBenz 2823C Heavy Hauler (6x4)">BharatBenz 2823C Heavy Hauler (6x4)</option>
                    <option value="Tata Signa 4825.TK 16-Wheeler Multi-Axle">Tata Signa 4825.TK 16-Wheeler Multi-Axle</option>
                    <option value="Ashok Leyland Ecomet 1215 High Deck">Ashok Leyland Ecomet 1215 High Deck</option>
                    <option value="Mahindra Bolero Maxi Truck (Last Mile)">Mahindra Bolero Maxi Truck (Last Mile)</option>
                    <option value="Eicher Pro 3015 Container Carrier">Eicher Pro 3015 Container Carrier</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="specialHandlingNotes" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Special Cargo Handling Instructions (Optional)
                  </label>
                  <textarea
                    id="specialHandlingNotes"
                    rows={2}
                    value={form.specialHandlingNotes}
                    onChange={(e) => updateField('specialHandlingNotes', e.target.value)}
                    placeholder="e.g. Keep tarpaulin tied down. Do not stack above 2 tiers."
                    className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* STEP 3: Compliance, Driver & POD Settings */}
        {currentStep === 3 && (
          <section className="space-y-6 animate-in fade-in duration-150" aria-labelledby="step3-heading">
            <h2 id="step3-heading" className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-500" aria-hidden="true" />
              <span>Step 3: GST E-Way Bill &amp; Assigned Hauler Driver</span>
            </h2>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="ewayBillNumber" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    GST 12-Digit E-Way Bill Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="ewayBillNumber"
                    type="text"
                    maxLength={12}
                    required
                    aria-invalid={!!errors.ewayBillNumber}
                    placeholder="e.g. 541098772091"
                    value={form.ewayBillNumber}
                    onChange={(e) => updateField('ewayBillNumber', e.target.value)}
                    className="w-full text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                  />
                  {errors.ewayBillNumber && (
                    <p className="mt-1 text-xs text-rose-500">{errors.ewayBillNumber}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="vehicleNumber" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Truck Plate Registration Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="vehicleNumber"
                    type="text"
                    required
                    aria-invalid={!!errors.vehicleNumber}
                    placeholder="MH-04-ER-9912"
                    value={form.vehicleNumber}
                    onChange={(e) => updateField('vehicleNumber', e.target.value.toUpperCase())}
                    className="w-full text-xs font-mono uppercase rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="driverName" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Driver Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="driverName"
                    type="text"
                    required
                    aria-invalid={!!errors.driverName}
                    value={form.driverName}
                    onChange={(e) => updateField('driverName', e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="driverPhone" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Driver Mobile Phone <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="driverPhone"
                    type="tel"
                    required
                    aria-invalid={!!errors.driverPhone}
                    value={form.driverPhone}
                    onChange={(e) => updateField('driverPhone', e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label htmlFor="driverLicense" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Heavy Transport Commercial License No.
                  </label>
                  <input
                    id="driverLicense"
                    type="text"
                    value={form.driverLicense}
                    onChange={(e) => updateField('driverLicense', e.target.value)}
                    className="w-full text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white"
                  />
                </div>

                {/* Proof of Delivery Security Toggles */}
                <div className="sm:col-span-2 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Proof of Delivery (e-POD) Mandatory Controls:
                  </span>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={form.requireSignature}
                      onChange={(e) => updateField('requireSignature', e.target.checked)}
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
                    />
                    <span>Mandatory Consignee Touchscreen Digital Signature on Handheld</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={form.requireOtp}
                      onChange={(e) => updateField('requireOtp', e.target.checked)}
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
                    />
                    <span>SMS OTP verification to Consignee phone before unsealing truck</span>
                  </label>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* STEP 4: Review Summary, Pricing & Confirmation */}
        {currentStep === 4 && (
          <section className="space-y-6 animate-in fade-in duration-150" aria-labelledby="step4-heading">
            <h2 id="step4-heading" className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-500" aria-hidden="true" />
              <span>Step 4: Review Consignment Note &amp; Confirm Bilty Generation</span>
            </h2>

            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              {/* Route Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl text-xs">
                <div>
                  <span className="font-bold text-slate-400 uppercase text-[10px]">Origin Shipper</span>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">{form.consignorName}</div>
                  <div className="text-slate-500">{form.originHub}</div>
                  <div className="font-mono text-amber-600 mt-1">GSTIN: {form.consignorGstin}</div>
                </div>

                <div>
                  <span className="font-bold text-slate-400 uppercase text-[10px]">Destination Consignee</span>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">{form.consigneeName}</div>
                  <div className="text-slate-500">{form.destinationHub}</div>
                  <div className="font-mono text-emerald-600 mt-1">GSTIN: {form.consigneeGstin}</div>
                </div>
              </div>

              {/* Manifest Review */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Goods Type:</span>
                  <strong className="text-slate-900 dark:text-white">{form.goodsType}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Total Weight:</span>
                  <strong className="text-slate-900 dark:text-white">{form.weightKg.toLocaleString()} kg</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Package Units:</span>
                  <strong className="text-slate-900 dark:text-white">{form.quantity} x {form.packageType}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Declared Value:</span>
                  <strong className="text-slate-900 dark:text-white">₹{form.declaredValueInr.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              {/* Hauler & Compliance */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-3 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-slate-400 block">Vehicle Number:</span>
                  <strong className="font-mono text-slate-900 dark:text-white">{form.vehicleNumber}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Driver Assigned:</span>
                  <strong className="text-slate-900 dark:text-white">{form.driverName} ({form.driverPhone})</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">GST E-Way Bill:</span>
                  <strong className="font-mono text-slate-900 dark:text-white">{form.ewayBillNumber}</strong>
                </div>
              </div>

              {/* Price Calculation Card */}
              <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 text-xs space-y-2">
                <div className="font-bold text-amber-900 dark:text-amber-200 text-sm">
                  Estimated Freight &amp; Toll Invoice
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Base Freight Haulage Rate:</span>
                  <span className="font-mono">₹{estimatedFreight.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Fastag Electronic Tolls (Mumbai-Pune / Thane):</span>
                  <span className="font-mono">₹{estimatedTolls.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>GST (12% Freight Transport):</span>
                  <span className="font-mono">₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-slate-900 dark:text-white pt-2 border-t border-amber-200 dark:border-amber-900/60">
                  <span>Total Estimated Bilty Payable:</span>
                  <span className="font-mono text-amber-600 dark:text-amber-400">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Navigation Step Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Step {currentStep - 1}</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-600 text-white dark:text-slate-950 font-bold text-xs shadow-md transition-colors focus:ring-2 focus:ring-amber-500"
            >
              <span>Continue to Step {currentStep + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Generating Bilty...' : 'Confirm & Book Consignment'}</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
