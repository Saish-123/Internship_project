import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Camera, AlertCircle } from 'lucide-react';
import { ProofOfDelivery } from '../../types/logistics';
import { SignaturePad } from '../common/SignaturePad';

interface PodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pod: ProofOfDelivery) => void;
  shipmentId: string;
  consigneeName: string;
}

export const PodModal: React.FC<PodModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  shipmentId,
  consigneeName,
}) => {
  const [receivedBy, setReceivedBy] = useState('');
  const [relation, setRelation] = useState<ProofOfDelivery['relation']>('Store Manager');
  const [otpVerified, setOtpVerified] = useState(true);
  const [biltyStamped, setBiltyStamped] = useState(true);
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [signatureDataUrl, setSignatureDataUrl] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!receivedBy.trim()) {
      newErrors.receivedBy = 'Recipient name is required';
    }
    if (!signatureDataUrl) {
      newErrors.signature = 'Digital signature is required for electronic Proof of Delivery';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const pod: ProofOfDelivery = {
      receivedBy: receivedBy.trim(),
      relation,
      otpVerified,
      biltyStamped,
      deliveryNotes: deliveryNotes.trim() || undefined,
      signatureUrl: signatureDataUrl,
      photoUrl: photoUrl || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
      deliveredAt: new Date().toISOString(),
    };

    onSubmit(pod);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pod-modal-title"
    >
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-xl w-full border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h2 id="pod-modal-title" className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>Record Proof of Delivery (e-POD)</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Consignment: <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{shipmentId}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Proof of Delivery dialog"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {Object.keys(errors).length > 0 && (
            <div 
              role="alert" 
              className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 rounded-lg text-sm text-rose-800 dark:text-rose-200 flex items-start gap-2"
            >
              <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-semibold">Please resolve the following required fields:</p>
                <ul className="list-disc list-inside mt-1 text-xs space-y-0.5">
                  {Object.values(errors).map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Consignee:</span> {consigneeName}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pod-received-by" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Recipient Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="pod-received-by"
                type="text"
                required
                aria-invalid={!!errors.receivedBy}
                aria-describedby={errors.receivedBy ? "received-by-error" : undefined}
                value={receivedBy}
                onChange={(e) => {
                  setReceivedBy(e.target.value);
                  if (errors.receivedBy) setErrors({ ...errors, receivedBy: '' });
                }}
                placeholder="e.g. Ramesh Shinde"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
              />
              {errors.receivedBy && (
                <p id="received-by-error" className="mt-1 text-xs text-rose-600 dark:text-rose-400 font-medium">
                  {errors.receivedBy}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="pod-relation" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Relationship / Role
              </label>
              <select
                id="pod-relation"
                value={relation}
                onChange={(e) => setRelation(e.target.value as ProofOfDelivery['relation'])}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
              >
                <option value="Store Manager">Store / Warehouse Manager</option>
                <option value="Direct Recipient">Direct Consignee Recipient</option>
                <option value="Security Guard">Security Gate / Guard</option>
                <option value="Consignee Staff">Consignee Staff / Clerk</option>
              </select>
            </div>
          </div>

          {/* Verification checkboxes */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={otpVerified}
                onChange={(e) => setOtpVerified(e.target.checked)}
                className="rounded border-slate-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
              />
              <span>Delivery OTP Verified on Driver Handheld</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={biltyStamped}
                onChange={(e) => setBiltyStamped(e.target.checked)}
                className="rounded border-slate-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
              />
              <span>Physical Bilty Stamped & Signed</span>
            </label>
          </div>

          {/* Digital Signature Pad */}
          <div>
            <SignaturePad
              onSave={(dataUrl) => {
                setSignatureDataUrl(dataUrl);
                if (errors.signature) setErrors({ ...errors, signature: '' });
              }}
              onClear={() => setSignatureDataUrl('')}
            />
            {errors.signature && (
              <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 font-medium">
                {errors.signature}
              </p>
            )}
          </div>

          {/* Stamped LR Photo / Cargo Photo Upload */}
          <div>
            <label htmlFor="pod-photo-upload" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Stamped Bilty / Unloaded Cargo Photo (Optional)
            </label>
            <div className="flex items-center gap-3">
              <label 
                htmlFor="pod-photo-upload" 
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
              >
                <Camera className="w-4 h-4 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                <span>Choose File or Snap</span>
                <input
                  id="pod-photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="sr-only"
                />
              </label>

              {photoUrl && (
                <div className="flex items-center gap-2">
                  <img
                    src={photoUrl}
                    alt="Uploaded Proof of Delivery"
                    className="w-10 h-10 object-cover rounded border border-slate-300 dark:border-slate-700"
                  />
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Photo attached</span>
                </div>
              )}
            </div>
          </div>

          {/* Delivery Notes */}
          <div>
            <label htmlFor="pod-notes" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Delivery Notes / Inspection Remarks
            </label>
            <textarea
              id="pod-notes"
              rows={2}
              value={deliveryNotes}
              onChange={(e) => setDeliveryNotes(e.target.value)}
              placeholder="e.g. All cartons delivered intact. Received in good condition at Dock 2."
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-md focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors flex items-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" aria-hidden="true" />
              <span>Confirm &amp; Complete Delivery</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
